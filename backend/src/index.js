// Loads environment variables first so other modules can use them safely.
import "./lib/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import monthRoutes from "./routes/month.route.js"
import { sendErrorResponse } from "./utils/errorHandling.js";

const app = express();
app.use(cors(
    {
       origin: process.env.FRONTEND_URL,
       credentials: true,
    }
));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/month", monthRoutes);

// Global error handler
app.use((err, req, res, next) => {
  sendErrorResponse(res, err, `${req.method} ${req.originalUrl}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});