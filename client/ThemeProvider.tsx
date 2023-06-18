// ThemeProvider.js

import React from "react";
import { useAppSelector, useAppDispatch } from "./redux-manager/hooks";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { setTheme } from "./redux-manager/redux-slice/theme-slice";

const ThemeProvider = ({ children }) => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleSetTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  // Define your theme colors based on the theme value
  const colors = {
    bubble_gum: {
      primary: "#E07594",
      secondary: "#F6E6EB",
      background: "#FFFFFF",
    },
    steel: {
      primary: "#454545",
      secondary: "#6A6A6A",
      background: "#FFFFFF",
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
