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
    const token = localStorage.getItem("token");

    if (!token) {
      set({ authUser: null, isCheckingAuth: false });
      return;
    }

    try {
      const response = await authService.checkAuth();

      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });

      if (error.response?.status !== 401) {
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

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({ authUser: user });

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

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({ authUser: user });

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

      localStorage.removeItem("token");

      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      handleToastErrorMessage(error);
    }
  },
}));

export default useAuthStore;
