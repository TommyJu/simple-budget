import { create } from "zustand";
import toast from "react-hot-toast";
import monthService from "../../services/monthService";
import { handleToastErrorMessage } from "@/lib/utils";

const useMonthStore = create((set) => ({
  isMonthsLoading: false,
  monthOverviews: [],

  getMonthOverviews: async () => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.getMonthOverviews();
      set({ monthOverviews: response.data });
    } catch (error) {
      handleToastErrorMessage(error, "Failed to load months");
    } finally {
      set({ isMonthsLoading: false });
    }
  },
  createMonth: async (payloadData) => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.createMonth(
        payloadData
      );

      const newMonth = response.data;

      set((state) => ({
        monthOverviews: [...state.monthOverviews, newMonth],
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
