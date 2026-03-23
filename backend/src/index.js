// Loads environment variables first so other modules can use them safely.
import "./lib/env.js";
import moduleAlias from ""
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("backend running");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});