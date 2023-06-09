import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FastingState {
	elapsedPercentage: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
}

const initialState: FastingState = {
	elapsedPercentage: 0,
	maxTime: 1,
	startDate: "",
	endDate: "",
	countdown: "00:00:00",
};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {
		setPercentageComplete(state, action: PayloadAction<number>) {
			state.elapsedPercentage = action.payload;
		},
		setMaxTime(state, action: PayloadAction<number>) {
			state.maxTime = action.payload;
		},
		setStartDate(state, action: PayloadAction<string>) {
			state.startDate = action.payload;
		},
		setEndDate(state, action: PayloadAction<string>) {
			state.endDate = action.payload;
		},
		setCountdown(state, action: PayloadAction<string>) {
			state.countdown = action.payload;
		},
		setTimerStates(state, action) {
			return { ...state, ...action.payload };
		},
	},
});

export const {
	setPercentageComplete,
	setMaxTime,
	setStartDate,
	setEndDate,
	setCountdown,
	setTimerStates,
} = fastingSlice.actions;

export default fastingSlice.reducer;
