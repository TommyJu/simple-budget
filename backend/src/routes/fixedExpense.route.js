import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createFixedExpense, getFixedExpenses, editFixedExpense, deleteFixedExpense } from "../controllers/fixedExpense.controller.js";
import { createFixedExpenseSchema, getFixedExpensesSchema, editFixedExpenseSchema, deleteFixedExpenseSchema } from "../validators/fixedExpense.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/create-fixed-expense", protectRoute, validate(createFixedExpenseSchema), createFixedExpense);
router.get("/get-fixed-expenses", protectRoute, validate(getFixedExpensesSchema), getFixedExpenses);
router.put("/edit-fixed-expense", protectRoute, validate(editFixedExpenseSchema), editFixedExpense);
router.delete("/delete-fixed-expense", protectRoute, validate(deleteFixedExpenseSchema), deleteFixedExpense);

export default router;