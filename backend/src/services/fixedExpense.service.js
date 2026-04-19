import pool from "../lib/db.js";
import { AppError } from "../utils/errorHandling.js";

export async function addFixedExpenseToDB(
  userId,
  amount,
  category,
  description,
) {
  const query = `
        INSERT INTO fixed_expenses
        (user_id, amount, category, description)
        VALUES
    ($1, $2, $3, $4)
        RETURNING *
    `;
  const values = [userId, amount, category, description];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getFixedExpensesFromDB(userId, category = "all") {
  const query = `
        SELECT *
        FROM fixed_expenses
        WHERE 
            user_id = $1 AND
            ($2 = 'all' OR category::text = $2)
        ORDER BY created_at DESC;
    `;
  const values = [userId, category];

  const { rows } = await pool.query(query, values);
  return rows;
}
export async function editFixedExpenseInDB(
  userId,
  fixedExpenseId,
  amount,
  category,
  description,
) {
  const query = `
        UPDATE fixed_expenses f
        SET
            amount = $1,
            category = $2,
            description = $3
        WHERE user_id = $4 AND id = $5
        RETURNING f.*;
    `;
  const values = [amount, category, description, userId, fixedExpenseId];

  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new AppError("Fixed expense not found", 404);
  }
  return rows[0];
}

export async function deleteFixedExpenseFromDB(userId, fixedExpenseId) {
  const query = `
        DELETE FROM fixed_expenses
        WHERE 
            user_id = $1 AND
            id = $2
        RETURNING *
    `;
  const values = [userId, fixedExpenseId];
  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new AppError("Fixed expense not found", 404);
  }
  return rows[0];
}
