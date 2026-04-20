import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth, getMonths, editMonth, deleteMonth, getMonthlyBudgetDetails } from "../controllers/month.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { createMonthSchema, editMonthSchema, deleteMonthSchema, getBudgetDetailsSchema } from "../validators/month.validator.js";

const router = express.Router();

router.post("/create-month", protectRoute, validate(createMonthSchema), createMonth);
router.get("/get-months", protectRoute, getMonths);
router.put("/edit-month", protectRoute, validate(editMonthSchema), editMonth);
router.delete("/delete-month", protectRoute, validate(deleteMonthSchema), deleteMonth);
router.get("/get-budget-details", protectRoute, validate(getBudgetDetailsSchema), getMonthlyBudgetDetails);

export default router;