import "./App.css";
import { useEffect } from "react";
import useThemeStore from "@/store/theme/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useAuthStore from "@/store/auth/useAuthStore";
import useMonthStore from "./store/month/useMonthStore";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MonthlyOverview from "@/pages/MonthlyOverview";
import MonthlyDetails from "@/pages/MonthlyDetails";
import FixedExpenses from "./pages/FixedExpenses";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  // DaisyUI Themes
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Authentication
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  const { selectedMonthId } = useMonthStore();

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <MonthlyOverview /> : <Landing />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/monthly-details"
          element={authUser && selectedMonthId ? <MonthlyDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/fixed-expenses"
          element={authUser ? <FixedExpenses /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        toastOptions={{
          className:  "rounded-lg border border-base-content !bg-base-300 !text-base-content p-4 shadow-lg"
        }}
      />
    </div>
  );
}

export default App;
