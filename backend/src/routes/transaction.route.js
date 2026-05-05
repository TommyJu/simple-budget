import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createTransaction, getTransactions, editTransaction, deleteTransaction } from "../controllers/transaction.controller.js";
import { createTransactionSchema, editTransactionSchema } from "../validators/transaction.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/create-transaction", protectRoute, validate(createTransactionSchema), createTransaction);
router.get("/get-transactions", protectRoute, getTransactions);
router.put("/edit-transaction", protectRoute, validate(editTransactionSchema), editTransaction);
router.delete("/delete-transaction", protectRoute, deleteTransaction);

export default router;