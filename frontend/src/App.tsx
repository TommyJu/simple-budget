import "./App.css";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme/useThemeStore";

function App() {
    // DaisyUI Themes
  const { theme } = useThemeStore();
    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <h1 className="text-secondary">Get started</h1>
    </>
  );
}

export default App;
