import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MedState {
	elapsedPercentage: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
	medStreak: {
		Mon: boolean;
		Tues: boolean;
		Wed: boolean;
		Thurs: boolean;
		Fri: boolean;
		Sat: boolean;
		Sun: boolean;
	};
}

const initialState: MedState = {
	elapsedPercentage: 0,
	maxTime: 5,
	startDate: "",
	endDate: "",
	countdown: "00:00",
	medStreak: {
		Mon: false,
		Tues: false,
		Wed: false,
		Thurs: false,
		Fri: false,
		Sat: false,
		Sun: false,
	},
};

const medSlice = createSlice({
	name: "meditation",
	initialState,
	reducers: {
		setMaxTime(state, action: PayloadAction<number>) {
			state.maxTime = action.payload;
		},
		setCountdown(state, action: PayloadAction<string>) {
			state.countdown = action.payload;
		},
		setTimerStates(state, action) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setTimerStates, setCountdown, setMaxTime } = medSlice.actions;

export default medSlice.reducer;
