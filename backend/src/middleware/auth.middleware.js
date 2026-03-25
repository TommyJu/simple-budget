import jwt from "jsonwebtoken";
import pool from "../lib/db.js";
import { sendErrorResponse, throwError } from "../utils/errorHandling.js";


export const protectRoute = async (req, res, next) => {
  try {
    const authToken = req.cookies.jwt;
    const userId = await findUserIdUsingAuthToken(authToken);

    req.userId = userId;
    next();
  } catch (error) {
    sendErrorResponse(res, error, "authentication middleware protectRoute");
  }
};

// Helper function
const findUserIdUsingAuthToken = async (authToken) => {
  if (!authToken) {
    throwError("Unauthorized, no token provided.", 401);
  }

  // Verify JWT
  let decodedToken;
  try {
    decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
  } catch (error) {
    throwError("Invalid or expired token.", 401);
  }

  const userId = decodedToken.userId;
  const query = "SELECT id FROM users WHERE id = $1";
  const values = [userId];

  const { rowCount } = await pool.query(query, values);
  if (rowCount < 1) {
    throwError("User not found.", 404);
  }

  return userId;
};
