import { create } from "zustand";
import toast from "react-hot-toast";
import monthService from "../../services/monthService";
import { handleToastErrorMessage } from "@/lib/utils";

const useMonthStore = create((set, get) => ({
  isMonthsLoading: false,
  monthOverviews: [],
  selectedMonthId: null,
  selectedMonthDetails: null,

  setSelectedMonthId: (monthId) => {
    set({
      selectedMonthId: monthId,
    });
  },

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
      const response = await monthService.createMonth(payloadData);

      const newMonth = response.data;

      set((state) => ({
        monthOverviews: [newMonth, ...state.monthOverviews],
      }));
      toast.success("Monthly budget created successfully");
    } catch (error) {
      handleToastErrorMessage(error, "Failed to create monthly budget");
    } finally {
      set({ isMonthsLoading: false });
    }
  },

  getMonthDetails: async () => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.getMonthDetails({ monthId: get().selectedMonthId });
      set({
        selectedMonthDetails: response.data,
      });
    } catch (error) {
      handleToastErrorMessage(error, "Failed to load months details");
    } finally {
      set({ isMonthsLoading: false });
    }
  },

  editMonth: async (data) => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.editMonth(data);
      const updatedMonthDetails = response.data;
      set({
        selectedMonthDetails: updatedMonthDetails,
      });
    } catch (error) {
      handleToastErrorMessage(error, "Failed to edit month");
    } finally {
      set({ isMonthsLoading: false });
    }
  },

  deleteMonth: async (monthId) => {
    set({ isMonthsLoading: true });
    try {
      const response = await monthService.deleteMonth({ monthId: get().selectedMonthId });
  
      set({selectedMonthDetails: null});
      set({selectedMonthId: null});

    } catch (error) {
      handleToastErrorMessage(error, "Failed to delete month");
    } finally {
      set({ isMonthsLoading: false });
    }
  },
}));

export default useMonthStore;
