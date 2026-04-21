import { create } from "zustand";
import toast from "react-hot-toast";
import fixedExpenseService from "../../services/fixedExpenseService";
import { handleToastErrorMessage } from "@/lib/utils";

const useFixedExpenseStore = create((set, get) => ({
  fixedExpenses: [],
  currentFilter: "all",
  isLoadingFixedExpenses: false,

  createFixedExpense: async function (data) {
    set({ isLoadingFixedExpenses: true });
    try {
      const { currentFilter } = get();
      const response = await fixedExpenseService.createFixedExpense(data);
      const newFixedExpense = response.data;
      if (
        currentFilter === "all" ||
        currentFilter === newFixedExpense.category
      ) {
        set((state) => ({
          fixedExpenses: [...state.fixedExpenses, newFixedExpense],
        }));
      }
      toast.success("Fixed expense created successfully");
    } catch (error) {
      handleToastErrorMessage(error, "Failed to create fixed expense");
    } finally {
      set({ isLoadingFixedExpenses: false });
    }
  },
  getFixedExpenses: async function () {
    set({ isLoadingFixedExpenses: true });
    try {
      const { currentFilter } = get();
      const response =
        await fixedExpenseService.getFixedExpenses(currentFilter);
      const fixedExpenses = response.data;
      set({ fixedExpenses: fixedExpenses });
    } catch (error) {
      handleToastErrorMessage(error, "Failed to fetch fixed expenses");
    } finally {
      set({ isLoadingFixedExpenses: false });
    }
  },
  editFixedExpense: async function (data) {
    set({ isLoadingFixedExpenses: true });
    try {
      const response = await fixedExpenseService.editFixedExpense(data);
      const editedFixedExpense = response.data;
      set((state) => ({
        fixedExpenses: state.fixedExpenses.map((expense) =>
          expense.id === editedFixedExpense.id ? editedFixedExpense : expense,
        ),
      }));
      toast.success("Fixed expense saved");
    } catch (error) {
      handleToastErrorMessage(error, "Failed to edit fixed expense");
    } finally {
      set({ isLoadingFixedExpenses: false });
    }
  },
  deleteFixedExpense: async function (data) {
    set({ isLoadingFixedExpenses: true });
    try {
      const response = await fixedExpenseService.deleteFixedExpense(data);
      const deletedFixedExpense = response.data;
      set((state) => ({
        fixedExpenses: state.fixedExpenses.filter(
          (expense) => expense.id !== deletedFixedExpense.id,
        ),
      }));
      toast.success("Fixed expense deleted successfully");
    } catch (error) {
      handleToastErrorMessage(error, "Failed to delete fixed expense");
    } finally {
      set({ isLoadingFixedExpenses: false });
    }
  },
}));

export default useFixedExpenseStore;
