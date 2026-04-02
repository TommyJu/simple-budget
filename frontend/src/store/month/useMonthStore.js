import { create } from "zustand";
import toast from "react-hot-toast";
import monthService from "../../services/monthService";
import { handleToastErrorMessage } from "@/lib/utils";

const useMonthStore = create((set) => ({
  isMonthsLoading: false,
  months: [],

  getMonths: async () => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.getMonths();
      set({ months: response.data.months });
    } catch (error) {
      handleToastErrorMessage(error, "Failed to load months");
    } finally {
      set({ isMonthsLoading: false });
    }
  },
  createMonth: async (
    date,
    income,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
  ) => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.createMonth(
        date,
        income,
        needsPercentage,
        wantsPercentage,
        savingsPercentage,
      );

      const newMonth = response.data.newMonth;

      set((state) => ({
        months: [...state.months, newMonth],
      }));

      toast.success("Monthly budget created successfully");
    } catch (error) {
      handleToastErrorMessage(error, "Failed to create monthly budget");
    } finally {
      set({ isMonthsLoading: false });
    }
  },
}));

export default useMonthStore;
