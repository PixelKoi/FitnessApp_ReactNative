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
	startMeditationTimer: boolean;
	timeSpentMeidtatingHours: string;
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
	startMeditationTimer: false,
	timeSpentMeidtatingHours: "0.00",
};

const medSlice = createSlice({
	name: "meditation",
	initialState,
	reducers: {
		setPLayAudio(state, action) {
			state.playAudio = action.payload;
		},
		setMeditationTimer(state, action) {
			state.startMeditationTimer = action.payload;
		},
		setSound(state, action) {
			state.sound = action.payload;
		},
		incrementTimeSpentMeditating(state) {
			state.timeSpentMeditating += 1;
			state.timeSpentMeidtatingHours = (
				state.timeSpentMeditating / 3600
			).toFixed(2);
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
	setMeditationTimer,
} = medSlice.actions;

export default medSlice.reducer;
