import toast from "react-hot-toast";
import { MIN_PASSWORD_LENGTH } from "@/../../shared/auth.constants";

export const handleToastErrorMessage = (error) => {
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
