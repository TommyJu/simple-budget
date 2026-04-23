import bcrypt from "bcryptjs";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  NUM_SALT_ROUNDS_FOR_PASSWORD_HASH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} from "../constants/auth.constant.js";
import { AppError } from "../utils/errorHandling.js";
import pool from "../lib/db.js";

// Enforces non-empty fields within length bounds, and unique usernames
export const validateSignUp = async (username, password) => {
  checkEmptyFields(username, password);
  checkPasswordLength(password);
  checkUsernameLength(username);
  await checkUsernameUnique(username);
};

// Enforces valid credentials for an existing user
export const validateLogIn = async (username, password) => {
  checkEmptyFields(username, password);
  checkPasswordLength(password);
  checkUsernameLength(username);
  const userId = await checkLoginCredentials(username, password);
  return userId;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(NUM_SALT_ROUNDS_FOR_PASSWORD_HASH);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Creates a new user in the database
export const createAndSaveUser = async (username, hashedPassword) => {
  const query = `
        INSERT INTO users (username, hashed_password)
        VALUES ($1, $2)
        RETURNING id
    `;
  const values = [username, hashedPassword];

    const { rows } = await pool.query(query, values);
    const newUserId = rows[0].id;
    return newUserId;
};

// HELPER FUNCTIONS

const checkEmptyFields = (username, password) => {
  if (!username || !password || !username.trim() || !password.trim()) {
    throw new AppError("All fields are required.", 400);
  }
};

const checkPasswordLength = (password) => {
  if (
    password.length < MIN_PASSWORD_LENGTH ||
    password.length > MAX_PASSWORD_LENGTH
  ) {
    throw new AppError(`Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`,
      400);
  }
};

const checkUsernameLength = (username) => {
  if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    throw new AppError(
      `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.`,
      400,
    );
  }
};

const checkUsernameUnique = async (username) => {
    const { rowCount } = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username],
    );

    if (rowCount !== 0) {
      throw new AppError("Username is taken.", 400);
    }
};

const checkLoginCredentials = async (username, password) => {
  const { rowCount, rows } = await pool.query(
    "SELECT hashed_password, id FROM users WHERE username = $1",
    [username],
  );
  if (rowCount < 1) {
    throw new AppError("User does not exist", 404);
  }
  const hashedPassword = rows[0].hashed_password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 400);
  }
  const userId = rows[0].id;
  return userId;
};
