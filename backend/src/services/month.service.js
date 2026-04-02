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
  const query = `INSERT into MONTHS (date, income, needs_percentage, wants_percentage, savings_percentage, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`;
  const values = [
    date,
    income,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    userId,
  ];
  try {
    // Input validation for business logic
    if (needsPercentage + wantsPercentage + savingsPercentage !== 100) {
      throwError("Percentages must total 100.", 422);
    }

    const { rows } = await pool.query(query, values);
    return rows[0].id;
  } catch (error) {
    if (error.code === "23505") {
      throwError("Month already exists for this user.", 409);
    } else {
      console.error("Database error in addMonthToDB:", error);
      throwError("Internal server error from addMonthToDB", 500);
    }
  }
};
