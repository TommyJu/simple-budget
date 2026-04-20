import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth, getMonthOverviews, editMonth, deleteMonth, getMonthDetails } from "../controllers/month.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { createMonthSchema, editMonthSchema, deleteMonthSchema, getMonthDetailsSchema } from "../validators/month.validator.js";

const router = express.Router();

router.post("/create-month", protectRoute, validate(createMonthSchema), createMonth);
router.get("/get-month-overviews", protectRoute, getMonthOverviews);
router.put("/edit-month", protectRoute, validate(editMonthSchema), editMonth);
router.delete("/delete-month", protectRoute, validate(deleteMonthSchema), deleteMonth);
router.get("/get-month-details", protectRoute, validate(getMonthDetailsSchema), getMonthDetails);

export default router;