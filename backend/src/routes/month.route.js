import { protectRoute } from "../middleware/auth.middleware.js";
import express from "express";
import { createMonth } from "../controllers/month.controller.js";

const router = express.Router();

router.post("/create-month", protectRoute, createMonth);

export default router;