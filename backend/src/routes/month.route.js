import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth, getMonths } from "../controllers/month.controller.js";

const router = express.Router();

router.post("/create-month", protectRoute, createMonth);
router.get("/get-months", protectRoute, getMonths);

export default router;