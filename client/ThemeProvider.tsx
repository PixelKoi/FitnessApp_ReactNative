// ThemeProvider.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { setTheme } from "./themeSlice";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSetTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  // Define your theme colors based on the theme value
  const colors = {
    pink: {
      primary: "#E07594",
      secondary: "#F6E6EB",
      background: "#FFFFFF",
    },
    dark: {
      primary: "#FFFFFF",
      secondary: "#000000",
    },
  };

  return (
    <StyledThemeProvider
      theme={{ colors: colors[theme], setTheme: handleSetTheme }}
    >
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
