import { addMonthToDB, getMonthsFromDB, editMonthInDB, deleteMonthFromDB } from "../services/month.service.js";

// Creates a new monthly budget
export const createMonth = async (req, res, next) => {
  const data = req.validated;
  const userId = req.userId;
  try {
    const newMonth = await addMonthToDB(
      data.year,
      data.month,
      data.income,
      data.needsPercentage,
      data.wantsPercentage,
      data.savingsPercentage,
      userId,
    );
    res.status(201).json(newMonth);
  } catch (error) {
    next(error);
  }
};

// Gets all monthly budgets for the currently authenticated user
export const getMonths = async (req, res, next) => {
  const userId = req.userId;
  try {
    const months = await getMonthsFromDB(userId);
    res.status(200).json(months);
  } catch (error) {
    next(error);
  }
};

export async function editMonth(req, res, next) {
  const {
    monthId,
    monthData
  } = req.body;

  const userId = req.userId;

  try {
    const editedMonth = await editMonthInDB(monthId, userId, monthData);
    res.status(200).json(editedMonth);
  } catch (error) {
    next(error);
  }
};

export async function deleteMonth(req, res, next) {
  const {
    monthId
  } = req.body;

  const userId = req.userId;

    try {
    const deletedMonth = await deleteMonthFromDB(monthId, userId);
    res.status(200).json(deletedMonth);
  } catch (error) {
    next(error);
  }
};
