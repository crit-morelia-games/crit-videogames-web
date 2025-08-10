import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const DARK = {
  mode: "dark",
  back: "#11071E",
  primary: "#A22500",
  secondary: "#4779A6",
  text: "#FFFFFF",
  textSecondary: "#6D6D6D",
  icon: "#FFFFFF",
};
const LIGHT = {
  mode: "light",
  back: "#FFFFFF",
  primary: "#A22500",
  secondary: "#4779A6",
  text: "#000000",
  textSecondary: "#6D6D6D",
  icon: "#6D6D6D",
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === DARK ? LIGHT : DARK));
  };

  const [open, setOpen] = useState(false);

  const toggleSideNav = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const values = {
    theme,
    toggleTheme,
    open,
    toggleSideNav,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
