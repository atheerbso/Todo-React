import { useTheme } from "./ThemeProvider";

const Button = () => {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        <img
          src="/public/brightness-and-contrast.png"
          alt="Toggle Theme"
          className={`w-14 h-14 ml-4 ${darkMode ? "dark-mode" : ""}`}
        />
      </button>
    </div>
  );
};

export default Button;
