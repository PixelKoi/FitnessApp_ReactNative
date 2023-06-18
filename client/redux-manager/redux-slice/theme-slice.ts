import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const initialState: ThemeState = {
  colors: {
    primary: "#E07594",
    secondary: "#F6E6EB",
    background: "#FFFFFF",
  },
};

const themeSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.colors = action.payload.colors;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

// colors: {
//   bubble_gum: {
//     primary: "#E07594",
//         secondary: "#F6E6EB",
//         background: "#FFFFFF",
//   },
//   steel: {
//     primary: "#454545",
//         secondary: "#6A6A6A",
//         background: "#FFFFFF",
//   },
// },