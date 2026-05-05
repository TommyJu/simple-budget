import { create } from "zustand";
import toast from "react-hot-toast";
import transactionService from "../../services/transactionService";
import { handleToastErrorMessage } from "@/lib/utils";

const useTransactionStore = create((set, get) => ({
  transactions: [],
  currentFilter: "all",
  isLoadingTransactions: false,

  createTransaction: async function (data) {
    set({ isLoadingTransactions: true });
    try {
      const { currentFilter } = get();
      const response = await transactionService.createTransaction(data);
      const newTransaction = response.data;
      // Add new transaction to UI depending on current filter
      if (
        currentFilter === "all" ||
        currentFilter === newTransaction.category
      ) {
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      }
      toast.success("Transaction created successfully");
    } catch (error) {
        handleToastErrorMessage(error, "Failed to create transaction");
    } finally {
      set({ isLoadingTransactions: false });
    }
  },
  getTransactions: async function (data) {
    set({ isLoadingTransactions: true });
    const { currentFilter } = get();
    const response = await transactionService.getTransactions(data);
    const transactions = response.data;
    set({ transactions: transactions});
    try {
    } catch (error) {
        handleToastErrorMessage(error, "Failed to fetch transactions");
    } finally {
      set({ isLoadingTransactions: false });
    }
  },
  editTransaction: async function (data) {
    set({ isLoadingTransactions: true });
    try {
        const response = await transactionService.editTransaction(data);
        const editedTransaction = response.data;
        set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === editedTransaction.id ? editedTransaction : transaction,
        ),
      }));
      toast.success("Transaction saved");
    } catch (error) {
    } finally {
      set({ isLoadingTransactions: false });
    }
  },
  deleteTransaction: async function (data) {
    set({ isLoadingTransactions: true });
    try {
        const response = await transactionService.deleteTransaction(data);
        const deletedTransaction = response.data;
        set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== deletedTransaction.id,
        ),
      }));
      toast.success("Transaction deleted successfully");
    } catch (error) {
    } finally {
      set({ isLoadingTransactions: false });
    }
  },
}));
