import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Audio } from "expo-av";

interface MedState {
	percentageComplete: number;
	sound: Audio.Sound;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
	playAudio: boolean;
	timeSpentMeditating: number;
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
	sound: null,
	percentageComplete: 0,
	maxTime: 5,
	startDate: "",
	endDate: "",
	countdown: "00:00:00",
	timeSpentMeditating: 0,
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
		setSound(state, action) {
			state.sound = action.payload;
		},
		incrementTimeSpentMeditating(state) {
			state.timeSpentMeditating += 1;
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
	setSound,
	setPLayAudio,
	setTimerStates,
	setCountdown,
	setMaxTime,
	updateMedStreak,
	setPercentageComplete,
	incrementTimeSpentMeditating,
} = medSlice.actions;

export default medSlice.reducer;
