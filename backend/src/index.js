// Loads environment variables first so other modules can use them safely.
import "./lib/env.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("PERN backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});