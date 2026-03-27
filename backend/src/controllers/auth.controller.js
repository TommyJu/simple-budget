import { setJwtCookie } from "../lib/authToken.js";
import {
  validateLogIn,
  validateSignUp,
  hashPassword,
  createAndSaveUser,
} from "../services/auth.service.js";
import { sendErrorResponse } from "../utils/errorHandling.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    await validateSignUp(username, password);

    const hashedPassword = await hashPassword(password);

    const newUserId = await createAndSaveUser(username, hashedPassword);

    setJwtCookie(newUserId, res);
    res.status(201).json({
      id: newUserId,
      username,
    });
  } catch (error) {
    sendErrorResponse(res, error, "auth controller signup");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await validateLogIn(username, password);

    if (userId) {
      setJwtCookie(userId, res);
      res.status(200).json({
        id: userId,
        username,
      });
    }
  } catch (error) {
    sendErrorResponse(res, error, "auth controller login");
  }
};

export const logout = (req, res) => {
  try {
    // Expires the user's JWT token to log them out.
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    sendErrorResponse(res, error, "auth controller logout");
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.userId);
  } catch (error) {
    sendErrorResponse(res, error, "auth controller check auth");
  }
};
