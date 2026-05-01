import toast from "react-hot-toast";
import { MIN_PASSWORD_LENGTH } from "@/constants/auth.js";

export const handleToastErrorMessage = (error) => {
  console.error(error);
  const msg = error?.response?.data?.message || "Something went wrong";
  toast(msg, {
    icon: "⚠️",
  });
};

export const validateSignupForm = ({ fullName, email, password }) => {
  if (!fullName) return toast.error("Full name is required");
  if (!email) return toast.error("Email is required");
  if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
  if (!password) return toast.error("Password is required");
  if (password.length < MIN_PASSWORD_LENGTH)
    return toast.error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

  return true;
};

export function formatMonthYear(year, month) {
  const date = new Date(year, month - 1); // JS months are 0-based

  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}