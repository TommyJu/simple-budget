import { addMonthToDB, getMonthsFromDB } from "../services/month.service.js";
import { sendErrorResponse } from "../utils/errorHandling.js";

// Creates a new monthly budget
export const createMonth = async (req, res) => {
  const { date, income, needsPercentage, wantsPercentage, savingsPercentage } =
    req.body;
  const userId = req.userId;
  try {
    const newMonth = await addMonthToDB(
      date,
      income,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      userId,
    );
    res.status(201).json(newMonth);
  } catch (error) {
    sendErrorResponse(res, error, "month controller create month");
  }
};

// Gets all monthly budgets for the currently authenticated user
export const getMonths = async (req, res) => {
  const userId = req.userId;
  try {
    const months = await getMonthsFromDB(userId);
    res.status(200).json(months);
  } catch (error) {
    sendErrorResponse(res, error, "month controller get months");
  }
};
