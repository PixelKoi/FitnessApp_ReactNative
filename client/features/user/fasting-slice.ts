import { createSlice } from "@reduxjs/toolkit";

interface FastingState {
	elapsedPercentage: number;
	maxTime: number;
	// startDay: Date;
	// endDay: Date;
	// startTime: Date;
	// endTime: Date;
}

const initialState: FastingState = {
	elapsedPercentage: 0,
	maxTime: 1,
	// startDay: new Date(),
	// endDay: new Date(),
	// startTime: new Date(),
	// endTime: new Date(),
};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {
		updateElapsed(state, action: PayloadAction<number>) {
			state.elapsedPercentage = action.payload;
		},
		updateMax(state, action: PayloadAction<number>) {
			state.maxTime = action.payload;
		},
	},
});

export const { updateElapsed, updateMax } = fastingSlice.actions;

export default fastingSlice.reducer;
