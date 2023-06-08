import { createSlice } from "@reduxjs/toolkit";
export const sessionSlice = createSlice({
	name: "session",
	initialState: null,
	reducers: {
		setSession: (state, action) => {
			return action.payload;
		},
		clearSession: () => null,
	},
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
