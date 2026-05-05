import { create } from "zustand";
import toast from "react-hot-toast";
import transactionService from "../../services/transactionService";
import { handleToastErrorMessage } from "@/lib/utils";

const useTransactionStore = create((set, get) => ({
    transactions: [],
    currentFilter: "all",
    isLoadingTransactions: false,

    
}));