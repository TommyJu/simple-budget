import { addMonthToDB } from "../services/month.service.js";

export const createMonth = async (req, res) => {
  const { date, income, needsPercentage, wantsPercentage, savingsPercentage } =
    req.body;
  const userId = req.userId;
  try {
    const monthId = await addMonthToDB(
      date,
      income,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      userId,
    );
    res.status(201).json({ monthId });
  } catch (error) {
    sendErrorResponse(res, error, "month controller create month");
  }
};
