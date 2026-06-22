import jwt from "jsonwebtoken";
import pool from "../lib/db.js";
import { AppError } from "../utils/errorHandling.js";

// Verifies the user's auth token and saves userId for subsequent requests
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized, no token provided.", 401);
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = await findUserId(decodedToken);

    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

// HELPER FUNCTIONS 

// Gets userId from valid auth token
const findUserIdUsingAuthToken = async (authToken) => {
  if (!authToken) {
    throw new AppError("Unauthorized, no token provided.", 401);
  }

  // Verify JWT
  let decodedToken;
  try {
    decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired token.", 401);
  }

  const userId = await findUserId(decodedToken);
  return userId;
  
};

// Retrieves the userId from the JWT token and verifies that the user exists
async function findUserId(decodedToken) {
  const userId = decodedToken.userId;
  const query = "SELECT id FROM users WHERE id = $1";
  const values = [userId];

  const { rowCount } = await pool.query(query, values);
  if (rowCount < 1) {
    throw new AppError("User not found.", 404);
  }

  return userId;
};
