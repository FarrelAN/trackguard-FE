// ThemeContext.js
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/themes"; // Import your themes

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // Detect light or dark mode

  const theme = useMemo(() => {
    return colorScheme === "dark" ? darkTheme : lightTheme;
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext); // A hook to use the theme in any component
};
