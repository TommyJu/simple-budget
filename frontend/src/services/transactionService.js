import { axiosInstance } from "@/lib/axios";

const TransactionService = {
  createTransaction(data) {
    return axiosInstance.post("/create-transaction", data);
  },
  getTransactions({ monthId, category }) {
    return axiosInstance.get("/get-transactions", {
      params: {
        monthId: monthId,
        category: category,
      },
    });
  },
  editTransaction(data) {
    return axiosInstance.put("/edit-transaction", data);
  },
  deleteTransaction(transactionId) {
    return axiosInstance.delete("/delete-transaction", {
      params: transactionId,
    });
  },
};

export default TransactionService;
