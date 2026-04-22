import {
  addMonthToDB,
  getMonthOverviewsFromDB,
  editMonthInDB,
  deleteMonthFromDB,
  getMonthDetailsFromDB
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
export const getMonthOverviews = async (req, res, next) => {
  const userId = req.userId;
  try {
    const monthOverviews = await getMonthOverviewsFromDB(userId);
    res.status(200).json(monthOverviews);
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
  const data = req.query;

  try {
    const deletedMonth = await deleteMonthFromDB(data.monthId, userId);
    res.status(200).json(deletedMonth);
  } catch (error) {
    next(error);
  }
}

export async function getMonthDetails(req, res, next) {
  const userId = req.userId;
  const data = req.query;

  try {
    const budgetDetails = await getMonthDetailsFromDB(userId, data.monthId);
    res.status(200).json(budgetDetails);
  } catch (error) {
    next(error);
  }
}
