import { setJwtCookie } from "../lib/authToken.js";
import {
  validateAuthInput,
  hashPassword,
  createAndSaveUser,
  getUserId
} from "../services/auth.service.js";
import { sendErrorResponse } from "../utils/errorHandling.js";

export const signup = async (req, res) => {
  const { userName, password } = req.body;
  try {
    await validateAuthInput(userName, password);

    const hashedPassword = await hashPassword(password);

    const newUserId = await createAndSaveUser(userName, hashedPassword);

    setJwtCookie(newUserId, res);
    res.status(201).json({
      id: newUserId,
      userName,
    });
  } catch (error) {
    sendErrorResponse(res, error, "auth controller signup");
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    await validateAuthInput(userName, password);
    const userId = await getUserId(userName);

    setJwtCookie(userId, res);
    res.status(200).json({
      id: userId,
      userName,
    });
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
