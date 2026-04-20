import {
  addMonthToDB,
  getMonthsFromDB,
  editMonthInDB,
  deleteMonthFromDB,
  getMonthlyBudgetDetailsFromDB
} from "../services/month.service.js";

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
  const userId = req.userId;
  const data = req.validated;

  try {
    const editedMonth = await editMonthInDB(      
      userId,
      data.monthId,
      data.income,
      data.needsPercentage,
      data.wantsPercentage,
      data.savingsPercentage,
    );
    res.status(200).json(editedMonth);
  } catch (error) {
    next(error);
  }
}

export async function deleteMonth(req, res, next) {
  const userId = req.userId;
  const data = req.validated;

  try {
    const deletedMonth = await deleteMonthFromDB(data.monthId, userId);
    res.status(200).json(deletedMonth);
  } catch (error) {
    next(error);
  }
}

export async function getMonthlyBudgetDetails(req, res, next) {
  const userId = req.userId;
  const data = req.validated;

  try {
    const budgetDetails = await getMonthlyBudgetDetailsFromDB(userId, data.monthId);
    res.status(200).json(budgetDetails);
  } catch (error) {
    next(error);
  }
}
