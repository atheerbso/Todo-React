import React, { useState, createContext, useContext, useEffect } from "react"; //to  create a context  hold  theme state & function to toggle the theme

//interface
interface ThemeContextProps {
  darkMode: boolean; // boolean type ,  is active when dark mode is true
  toggleTheme: () => void; //function to toggle darkMode state
}

//here i create context to sharing data acroos comp.
const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  toggleTheme: () => {},
});

//useContext to access the ThemeContext constant  and return the darkMode state and toggleTheme function
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true); //here useState to manage the darkMode state

  const toggleTheme = () => {
    //toggles the darkMode state using functional state update
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    //Updates the data-theme attribute of the documentElement based on the darkMode state
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
