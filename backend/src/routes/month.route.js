import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth, getMonthOverviews, editMonth, deleteMonth, getMonthDetails } from "../controllers/month.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { createMonthSchema, editMonthSchema } from "../validators/month.validator.js";

const router = express.Router();

router.post("/create-month", protectRoute, validate(createMonthSchema), createMonth);
router.get("/get-month-overviews", protectRoute, getMonthOverviews);
router.put("/edit-month", protectRoute, validate(editMonthSchema), editMonth);
router.delete("/delete-month", protectRoute, deleteMonth);
router.get("/get-month-details", protectRoute, getMonthDetails);

export default router;