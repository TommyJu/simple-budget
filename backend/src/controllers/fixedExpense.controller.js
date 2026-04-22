import {
  addFixedExpenseToDB,
  getFixedExpensesFromDB,
  editFixedExpenseInDB,
  deleteFixedExpenseFromDB,
} from "../services/fixedExpense.service.js";

export async function createFixedExpense(req, res, next) {
  const userId = req.userId;
  const data = req.validated;

  try {
    const createdFixedExpense = await addFixedExpenseToDB(
      userId,
      data.amount,
      data.category,
      data.description,
    );
    res.status(200).json(createdFixedExpense);
  } catch (error) {
    next(error);
  }
}

export async function getFixedExpenses(req, res, next) {
  const userId = req.userId;
  const data = req.query;;

  try {
    const fixedExpenses = await getFixedExpensesFromDB(userId, data.category);
    res.status(200).json(fixedExpenses);
  } catch (error) {
    next(error);
  }
}

export async function editFixedExpense(req, res, next) {
  const userId = req.userId;
  const data = req.validated;

  try {
    const editedFixedExpense = await editFixedExpenseInDB(
      userId,
      data.fixedExpenseId,
      data.amount,
      data.category,
      data.description,
    );
    res.status(200).json(editedFixedExpense);
  } catch (error) {
    next(error);
  }
}

export async function deleteFixedExpense(req, res, next) {
  const userId = req.userId;
  const data = req.query;

  try {
    const deletedFixedExpense = await deleteFixedExpenseFromDB(
        userId,
        data.fixedExpenseId
    );
    res.status(200).json(deletedFixedExpense);
  } catch (error) {
    next(error);
  }
}
