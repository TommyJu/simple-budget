import { throwError } from "../utils/errorHandling.js";
import pool from "../lib/db.js";

export const addMonthToDB = async (
  date,
  income,
  needsPercentage,
  wantsPercentage,
  savingsPercentage,
  userId,
) => {
  // Input validation
  if (!userId) throwError("No user ID given", 400);
  if (needsPercentage + wantsPercentage + savingsPercentage !== 100) {
    throwError("Percentages must total 100.", 422);
  }

  const query = `
    INSERT INTO months 
      (date, income, needs_percentage, wants_percentage, savings_percentage, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, date, income, needs_percentage, wants_percentage, savings_percentage, user_id, created_at
  `;
  const values = [
    date,
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
