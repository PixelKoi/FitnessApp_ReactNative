import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const themes = {
  bubble_gum: {
    colors: {
      primary: "#E07594",
      secondary: "#F6E6EB",
      background: "#FFFFFF",
    },
  },
  steel: {
    primary: "#454545",
    secondary: "#6A6A6A",
    background: "#FFFFFF",
  },
  green_light: {
    primary: "#609966",
    secondary: "#EDF1D6",
    background: "#FFFFFF",
  },
  navy: {
    primary: "#526D82",
    secondary: "#DDE6ED",
    background: "#FFFFFF",
  },
};

interface ThemeState {
  colors: {
    primary: String;
    secondary: String;
    background: String;
  };
}

const initialState: ThemeState = {
  colors: themes.bubble_gum.colors,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<keyof typeof themes>) => {
      const selectedTheme = action.payload;
      state.currentTheme = selectedTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
