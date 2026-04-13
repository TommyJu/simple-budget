import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth, getMonths, editMonth, deleteMonth } from "../controllers/month.controller.js";

const router = express.Router();

router.post("/create-month", protectRoute, createMonth);
router.get("/get-months", protectRoute, getMonths);
router.put("/edit-month", protectRoute, editMonth);
router.delete("/delete-month", protectRoute, deleteMonth);

export default router;