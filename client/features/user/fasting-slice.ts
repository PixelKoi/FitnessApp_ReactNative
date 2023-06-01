import { createSlice } from "@reduxjs/toolkit";

interface FastingState {
	elapsed: number;
	// startDay: Date;
	// endDay: Date;
	// startTime: Date;
	// endTime: Date;
}

const initialState: FastingState = {
	elapsed: 0,
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
			state.elapsed = action.payload;
		},
	},
});

export const { updateElapsed } = fastingSlice.actions;

export default fastingSlice.reducer;
