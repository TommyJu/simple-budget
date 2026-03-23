import toast from "react-hot-toast";
import { MIN_PASSWORD_LENGTH } from "@/../../shared/auth.constants";
import { AxiosError } from "axios";


export const handleToastErrorMessage = (error: unknown) => {
  // Prefer backend message if Axios response exists, else fallback to generic Error message, else default string
  const msg =
    (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
    (error as Error)?.message ||
    "Something went wrong";

  toast.error(msg);
};

export const validateSignupForm = (fullName: string, email: string, password: string) => {
  if (!fullName) return toast.error("Full name is required");
  if (!email) return toast.error("Email is required");
  if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
  if (!password) return toast.error("Password is required");
  if (password.length < MIN_PASSWORD_LENGTH)
    return toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);

  return true;
};