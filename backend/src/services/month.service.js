import { throwError } from "../utils/errorHandling.js";
import pool from "../lib/db.js";

export const addMonthToDB = async (
  year,
  month,
  income,
  needsPercentage,
  wantsPercentage,
  savingsPercentage,
  userId,
) => {

  const query = `
    INSERT INTO months 
      (year, month, income, needs_percentage, wants_percentage, savings_percentage, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [
    year,
    month,
    income,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    userId,
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    // Handle unique violation
    if (error.code === "23505") {
      throwError("Month already exists for this user.", 409);
    }

    // Unexpected DB error
    console.error("Database error in addMonthToDB:", error);
    throwError("Internal server error", 500);
  }
};

export const getMonthsFromDB = async (userId) => {
  if (!userId) throwError("No user ID given", 400);

  const query = `SELECT * FROM months WHERE user_id = $1`;
  const values = [userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows; // empty array if no months
  } catch (error) {
    // Unexpected DB error
    console.error("Database error in getMonthsFromDB:", error);
    throwError("Internal server error", 500);
  }
};

export async function editMonthInDB(monthId, userId, monthData) {
  if (!userId) throwError("No user ID given", 400);
  const { income, needsPercentage, wantsPercentage, savingsPercentage } =
    monthData;
  // Input validation
  if (needsPercentage + wantsPercentage + savingsPercentage !== 100) {
    throwError("Percentages must add up to 100", 422);
  }
  if (income < 0) {
    throwError("Monthly income must be a positive number", 400);
  }

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

  try {
    const { rows, rowCount } = await pool.query(query, values);
    if (rowCount < 1) {
      throwError("Month not found", 404);
    }
    return rows[0]; // updated month
  } catch (error) {
    console.error("Database error in editMonthInDB:", error);
    throwError("Internal server error", 500);
  }
}

export async function deleteMonthFromDB(monthId, userId) {
  if (!userId) throwError("No user ID given", 400);
  if (!monthId) {
    throwError("Month ID is required", 400);
  }

  const query = `
    DELETE FROM months
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const values = [monthId, userId];

  try {
    const { rows, rowCount } = await pool.query(query, values);

    if (rowCount < 1) {
      throwError("Month not found", 404);
    }

    return rows[0];
  } catch (error) {
    console.error("Database error in deleteMonthFromDB:", error);
    throwError("Internal server error", 500);
  }
}
