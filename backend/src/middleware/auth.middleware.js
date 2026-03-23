import jwt from "jsonwebtoken";
import pool from "../db.js";
import { sendErrorResponse, throwError } from "../utils/errorHandling.js";


export const protectRoute = async (req, res, next) => {
  try {
    const authToken = req.cookies.jwt;
    const user = await findUserUsingAuthToken(authToken);

    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, error, "authentication middleware protectRoute");
  }
};

// Helper function
const findUserUsingAuthToken = async (authToken) => {
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

  const query = "SELECT id, username FROM users WHERE id = $1";
  const values = [decodedToken.userId];

  const { rows } = await pool.query(query, values);
  if (rows.length === 0) {
    throwError("User not found.", 404);
  }

  return rows[0]; // { id, username }
};
