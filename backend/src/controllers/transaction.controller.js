import { sendErrorResponse } from "../utils/errorHandling.js";
import {
  addTransactionToDB,
  getTransactionsFromDB,
  editTransactionInDB,
  deleteTransactionFromDB,
} from "../services/transaction.service.js";

// Creates a new transaction for a given monthly budget
export async function createTransaction(req, res, next) {
  try {
    const data = req.validated;
    const userId = req.userId;
    const addedTransaction = await addTransactionToDB(
      userId,
      data.monthId,
      data.amount,
      data.category,
      data.description,
    );
    res.status(200).json(addedTransaction);
  } catch (error) {
    next(error);
  }
}

// Gets all transactions for a monthly budget, filtered by category (optional)
export async function getTransactions(req, res) {}

// Edits an existing transaction the belongs to the authenticated user
export async function editTransaction(req, res) {}

// Deletes an existing transaction that belongs to the authenticated user
export async function deleteTransaction(req, res) {}
