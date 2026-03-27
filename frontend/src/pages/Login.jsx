import { useState } from "react";
import useAuthStore from "@/store/auth/useAuthStore";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} from "../../../shared/auth.constants";
import { Loader2 } from "lucide-react";

export const Login = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 h-dvh">
      <div className="flex flex-col items-center mb-12">
        <video
          src="/coin.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-40 h-auto "
        />
        <h1 className="indie-flower-regular text-7xl text-primary text-center">
          Simple Budget
        </h1>
        
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-75 sm:w-sm md:w-md lg:w-lg">
          <legend className="fieldset-legend text-xl">Log In to an Existing Account</legend>

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
            <a href="/signup" className="opacity-80 hover:opacity-100 underline">
              Need to create an account?
            </a>
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

          <button
            type="submit"
            className="btn btn-secondary mt-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
