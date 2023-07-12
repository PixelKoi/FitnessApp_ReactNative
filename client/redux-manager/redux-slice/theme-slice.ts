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
    colors: {
      primary: "#454545",
      secondary: "#000000",
      background: "#FFFFFF",
    },
  },
  green_light: {
    colors: {
      primary: "#609966",
      secondary: "#EDF1D6",
      background: "#FFFFFF",
      dark: "rgba(34,139,34,0.1)",
    },
  },
  navy: {
    colors: {
      primary: "#526D82",
      secondary: "#DDE6ED",
      background: "#FFFFFF",
    },
  },
};

interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const initialState: ThemeState = {
  colors: themes["bubble_gum"].colors,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const selectedThemeName = action.payload;
      const selectedTheme = themes[selectedThemeName];
      if (selectedTheme) {
        state.colors = selectedTheme.colors;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
