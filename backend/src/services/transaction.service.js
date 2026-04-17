import { AppError } from "../utils/errorHandling.js";
import pool from "../lib/db.js";

export async function addTransactionToDB(
  userId,
  monthId,
  amount,
  category,
  description,
) {
  const query = `
        INSERT INTO transactions (amount, category, description, month_id)
  SELECT $1, $2, $3, m.id
  FROM months m
  WHERE m.id = $4 AND m.user_id = $5
  RETURNING *
    `;
  const values = [amount, category, description, monthId, userId];
    const { rows } = await pool.query(query, values);
    const addedTransaction = rows[0];
    return addedTransaction;
}

export async function getTransactionsFromDB(
  userId,
  monthId,
  category = "all",
) {}

export async function editTransactionInDB(
  userId,
  transactionId,
  amount,
  category,
  description,
) {}

export async function deleteTransactionFromDB(userId, transactionId) {}
