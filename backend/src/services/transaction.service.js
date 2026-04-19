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
  if (rows.length === 0) {
    throw new AppError("Failed to create transaction", 400);
  }
  const addedTransaction = rows[0];
  return addedTransaction;
}

export async function getTransactionsFromDB(userId, monthId, category = "all") {
  const query = `
    SELECT t.*
    FROM transactions t
    JOIN months m ON t.month_id = m.id
    WHERE m.user_id = $1
      AND m.id = $2
      AND ($3 = 'all' OR t.category::text = $3)
    ORDER BY t.created_at DESC;
  `;
  const values = [userId, monthId, category];
  const { rows } = await pool.query(query, values);
  return rows;
}

export async function editTransactionInDB(
  userId,
  transactionId,
  amount,
  category,
  description,
) {
  const query = `
  UPDATE transactions t
  SET
    amount = $1,
    category = $2,
    description = $3
  FROM months m
  WHERE t.month_id = m.id
    AND t.id = $4
    AND m.user_id = $5
  RETURNING t.*;
`;
  const values = [amount, category, description, transactionId, userId];
  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new AppError("Transaction not found", 404);
  }
  return rows[0];
}

export async function deleteTransactionFromDB(userId, transactionId) {
  const query = `
  DELETE FROM transactions t
  USING months m
  WHERE
    t.month_id = m.id AND
    m.user_id = $1 AND
    t.id = $2
  RETURNING t.*;
  `;
  const values = [userId, transactionId];
  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throw new AppError("Transaction not found", 404);
  }
  return rows[0];
}
