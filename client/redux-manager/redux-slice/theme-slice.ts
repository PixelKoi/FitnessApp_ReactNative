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
			secondary: "#6A6A6A",
			background: "#FFFFFF",
		},
	},
	green_light: {
		colors: {
			primary: "#609966",
			secondary: "#EDF1D6",
			background: "#FFFFFF",
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
