import { useEffect } from "react";
import { create } from "zustand";

interface ThemeStore {
  darkMode: boolean;

  toggleTheme: () => void;
}

const useStore = create<ThemeStore>((set) => ({
  darkMode: window.matchMedia("(prefers-color-scheme: light)").matches,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const ZustandCom = () => {
  const { darkMode, toggleTheme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div>
      <Button darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

const Button = ({
  darkMode,
  toggleTheme,
}: {
  darkMode: boolean;
  toggleTheme: () => void;
}) => {
  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-14 ml-4 ${darkMode ? "dark-mode" : ""}`}
    >
      <img src="/public/brightness-and-contrast.png" alt="Toggle Theme" />
    </button>
  );
};
