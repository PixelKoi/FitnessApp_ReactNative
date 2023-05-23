import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FastingState {}

const initialState: FastingState = {};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {},
});

export const {} = fastingSlice.actions;

export default fastingSlice.reducer;
