import { create } from "zustand";
import { DEFAULT_THEME } from "@/constants/themes";

const useThemeStore = create ((set) => ({
    theme: localStorage.getItem("theme") || DEFAULT_THEME,
    
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    }
}));

export default useThemeStore;