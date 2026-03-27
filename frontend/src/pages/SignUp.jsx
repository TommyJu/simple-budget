import { useState } from "react";
import useAuthStore from "@/store/auth/useAuthStore";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} from "../../../shared/auth.constants";

export const SignUp = () => {
  const { signup } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ username, password });
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 h-dvh">
      <h1 className="indie-flower-regular text-7xl mb-24 text-primary">Simple Budget</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
          <legend className="fieldset-legend text-xl">Create an Account</legend>

          <label className="label">Username</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Username"
            minLength={MIN_USERNAME_LENGTH}
            maxLength={MAX_USERNAME_LENGTH}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full mb-2"
            placeholder="Password"
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_PASSWORD_LENGTH}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <a href="/login" className="opacity-80 hover:opacity-100 underline">Already have an account?</a>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
                className="checkbox ml-auto w-4 h-4"
              />
              <span>Show Password</span>
            </label>
          </div>

          <button type="submit" className="btn btn-secondary mt-4">
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
