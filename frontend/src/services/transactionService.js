import { axiosInstance } from "@/lib/axios";

const TransactionService = {
  createTransaction(data) {
    return axiosInstance.post("/transaction/create-transaction", data);
  },
  getTransactions({ monthId, category = 'all' }) {
    return axiosInstance.get("/transaction/get-transactions", {
      params: {
        monthId: monthId,
        category: category,
      },
    });
  },
  editTransaction(data) {
    return axiosInstance.put("/transaction/edit-transaction", data);
  },
  deleteTransaction(transactionId) {
    return axiosInstance.delete("/transaction/delete-transaction", {
      params: transactionId,
    });
  },
};

export default TransactionService;
