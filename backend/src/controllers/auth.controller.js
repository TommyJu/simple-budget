import { createJwtToken } from "../lib/authToken.js";
import {
  validateLogIn,
  validateSignUp,
  hashPassword,
  createAndSaveUser,
  getUserById
} from "../services/auth.service.js";

// Creates a new user given valid credentials in the HTTP request
export const signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await validateSignUp(username, password);

    const hashedPassword = await hashPassword(password);

    const newUserId = await createAndSaveUser(username, hashedPassword);

    const token = createJwtToken(newUserId);

    res.status(201).json({
      token,
      user: {
        id: newUserId,
        username
      },
    });
  } catch (error) {
    next(error);
  }
};

// Log in an existing user given valid credntials in the HTTP request
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userId = await validateLogIn(username, password);

    const token = createJwtToken(userId);

    res.status(201).json({
      token,
      user: {
        id: userId,
        username
      },
    });
  } catch (error) {
    next(error);
  }
};

// Expires the user's JWT token to log them out.
export const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

// Checks that the user is authenticated by seeing if the userId is set from the auth middleware
export const checkAuth = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};