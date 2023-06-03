import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MedState {
	elapsedPercentage: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
}

const initialState: MedState = {
	elapsedPercentage: 0,
	maxTime: 5,
	startDate: "",
	endDate: "",
	countdown: "00:00",
};

const medSlice = createSlice({
	name: "meditation",
	initialState,
	reducers: {
		setCountdown(state, action: PayloadAction<string>) {
			state.countdown = action.payload;
		},
		setTimerStates(state, action) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setTimerStates, setCountdown } = medSlice.actions;

export default medSlice.reducer;
