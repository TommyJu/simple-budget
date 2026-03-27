import { create } from "zustand";
import toast from "react-hot-toast";
import authService from "@/services/authService";
import { handleToastErrorMessage } from "@/lib/utils";

const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const response = await authService.checkAuth();
      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
      if (error.response?.status === 401) {
        console.info("User is not authenticated")
      } else {
        console.error("Error in checkAuth: ", error);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await authService.signup(data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      handleToastErrorMessage(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await authService.login(data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      handleToastErrorMessage(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      handleToastErrorMessage(error);
    }
  },
}));

export default useAuthStore;
