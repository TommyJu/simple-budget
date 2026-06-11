import { AppError } from "../utils/errorHandling.js";
import pool from "../lib/db.js";
import { getFixedExpensesFromDB } from "./fixedExpense.service.js";
import { addTransactionToDB } from "./transaction.service.js";

export const addMonthToDB = async (
  year,
  month,
  income,
  needsPercentage,
  wantsPercentage,
  savingsPercentage,
  userId,
) => {
  try {
    // Insert month
    const insertQuery = `
      INSERT INTO months 
        (year, month, income, needs_percentage, wants_percentage, savings_percentage, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;

    const { rows } = await pool.query(insertQuery, [
      year,
      month,
      income,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      userId,
    ]);

    const monthId = rows[0].id;

    await addFixedExpensesToMonth(userId, monthId);

    // Get full computed details after adding fixed expenses
    const detailsQuery = `
      SELECT
        m.id,
        m.year,
        m.month,
        m.income,

        COALESCE(SUM(t.amount), 0) AS total_spent,

        COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'needs'), 0) AS needs_spent,
        COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'wants'), 0) AS wants_spent,
        COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'savings'), 0) AS savings_spent

      FROM months m
      LEFT JOIN transactions t ON t.month_id = m.id
      WHERE m.id = $1
      GROUP BY m.id;
    `;

    const { rows: detailsRows } = await pool.query(detailsQuery, [monthId]);

    return detailsRows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("Month already exists", 409);
    }
    throw error;
  }
};

export const getMonthOverviewsFromDB = async (userId) => {
  const query = `
  SELECT
  m.id,
  m.year,
  m.month,
  m.income,

  COALESCE(SUM(t.amount), 0) AS total_spent,

  COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'needs'), 0) AS needs_spent,
  COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'wants'), 0) AS wants_spent,
  COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'savings'), 0) AS savings_spent

  FROM months m
  LEFT JOIN transactions t ON t.month_id = m.id
  WHERE m.user_id = $1
  GROUP BY m.id
  ORDER BY m.year DESC, m.month DESC;
  `;
  const values = [userId];

  const { rows } = await pool.query(query, values);
  return rows; // empty array if no months
};

export async function editMonthInDB(
  userId,
  monthId,
  income,
  needsPercentage,
  wantsPercentage,
  savingsPercentage,
) {
  const query = `
    UPDATE months
    SET 
      income = $1,
      needs_percentage = $2,
      wants_percentage = $3,
      savings_percentage = $4
    WHERE id = $5 AND user_id = $6
    RETURNING *;
  `;

  const values = [
    income,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    monthId,
    userId,
  ];

  const { rowCount } = await pool.query(query, values);
  if (rowCount < 1) {
    throw new AppError("Month not found", 404);
  }
  return getMonthDetailsFromDB(userId, monthId); // updated month
}

export async function deleteMonthFromDB(monthId, userId) {
  const query = `
    DELETE FROM months
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const values = [monthId, userId];

  const { rows, rowCount } = await pool.query(query, values);

  if (rowCount < 1) {
    throw new AppError("Month not found", 404);
  }

  return rows[0];
}

export async function getMonthDetailsFromDB(userId, monthId) {
  const query = `
    SELECT
      m.id,
      m.year,
      m.month,
      m.income,

      m.needs_percentage,
      m.wants_percentage,
      m.savings_percentage,



      -- Allocated budget per category
    ROUND(m.income * m.needs_percentage / 100, 2) AS needs_budget,
    ROUND(m.income * m.wants_percentage / 100, 2) AS wants_budget,
    ROUND(m.income * m.savings_percentage / 100, 2) AS savings_budget,

    -- Actual spending per category
    ROUND(COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'needs'), 0), 2) AS needs_spent,
    ROUND(COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'wants'), 0), 2) AS wants_spent,
    ROUND(COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'savings'), 0), 2) AS savings_spent,

    -- Remaining per category
    ROUND(
      (m.income * m.needs_percentage / 100)
      - COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'needs'), 0),
      2
    ) AS needs_remaining,

    ROUND(
      (m.income * m.wants_percentage / 100)
      - COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'wants'), 0),
      2
    ) AS wants_remaining,

    ROUND(
      (m.income * m.savings_percentage / 100)
      - COALESCE(SUM(t.amount) FILTER (WHERE t.category = 'savings'), 0),
      2
    ) AS savings_remaining

    FROM months m
    LEFT JOIN transactions t ON t.month_id = m.id

    WHERE m.user_id = $1 AND m.id = $2

    GROUP BY m.id;
  `;
  const values = [userId, monthId];

  const { rows, rowCount } = await pool.query(query, values);
  if (rowCount < 1) {
    throw new AppError("Month details not found", 404);
  }
  const budgetDetails = rows[0];
  return budgetDetails;
}

// HELPER FUNCTIONS

// Adds the fixed expenses associated with the user to the monthly budget as a transaction
export async function addFixedExpensesToMonth(userId, monthId) {
  const fixedExpenses = await getFixedExpensesFromDB(userId);
  fixedExpenses.forEach(async (expense) => {
    await addTransactionToDB(
      userId,
      monthId,
      expense.amount,
      expense.category,
      expense.description,
      true,
    );
  });
}
