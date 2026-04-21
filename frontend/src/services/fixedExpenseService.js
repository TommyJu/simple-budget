import { axiosInstance } from "@/lib/axios";

const fixedExpenseService = {
  createFixedExpense(data) {
    return axiosInstance.post("/fixed-expense/create-fixed-expense", data);
  },
  getFixedExpenses(filter) {
    return axiosInstance.get("/fixed-expense/get-fixed-expenses", {
      params: filter,
    });
  },
  editFixedExpense(data) {
    return axiosInstance.put("/fixed-expense/edit-fixed-expense", data);
  },
  deleteFixedExpense(data) {
    return axiosInstance.delete("/fixed-expense/delete-fixed-expense", data);
  },
};

export default fixedExpenseService;
