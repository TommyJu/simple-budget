import { create } from "zustand";
import toast from "react-hot-toast";
import authService from "@/services/authService";
import { handleToastErrorMessage } from "@/lib/utils";

const useMonthStore = create((set) => ({
    months: [],
    
}));