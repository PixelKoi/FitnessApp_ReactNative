import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MedState {
	percentageComplete: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
	playAudio: boolean;
	medStreak: {
		Mon: boolean;
		Tue: boolean;
		Wed: boolean;
		Thu: boolean;
		Fri: boolean;
		Sat: boolean;
		Sun: boolean;
	};
}

const initialState: MedState = {
	playAudio: false,
	percentageComplete: 0,
	maxTime: 5,
	startDate: "",
	endDate: "",
	countdown: "00:00:00",
	medStreak: {
		Sun: false,
		Mon: false,
		Tue: false,
		Wed: false,
		Thu: false,
		Fri: false,
		Sat: false,
	},
};

const medSlice = createSlice({
	name: "meditation",
	initialState,
	reducers: {
		setPLayAudio(state, action) {
			state.playAudio = action.payload;
		},
		setPercentageComplete(state, action: PayloadAction<number>) {
			state.percentageComplete = action.payload;
		},
		setMaxTime(state, action: PayloadAction<number>) {
			state.maxTime = action.payload;
		},
		setCountdown(state, action: PayloadAction<string>) {
			state.countdown = action.payload;
		},
		setTimerStates(state, action) {
			return { ...state, ...action.payload };
		},
		updateMedStreak(
			state,
			action: PayloadAction<{
				day: keyof MedState["medStreak"];
				completed: boolean;
			}>
		) {
			const { day, completed } = action.payload;
			state.medStreak[day] = completed;
		},
	},
});

export const {
	setPLayAudio,
	setTimerStates,
	setCountdown,
	setMaxTime,
	updateMedStreak,
	setPercentageComplete,
} = medSlice.actions;

export default medSlice.reducer;
