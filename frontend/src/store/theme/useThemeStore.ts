import { create } from "zustand";
import { DEFAULT_THEME } from "@/constants/themes";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
    theme: localStorage.getItem("theme") || DEFAULT_THEME,
    
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    }
}));

export default useThemeStore;