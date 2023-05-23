import { createSlice } from "@reduxjs/toolkit";

interface FastingState {
	startDay: Date;
	endDay: Date;
	startTime: Date;
	endTime: Date;
}

const initialState: FastingState = {
	startDay: new Date(),
	startTime: new Date(),
	endDay: new Date(),
	endTime: new Date(),
};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {
		setStartTime: (state, action) => {
			state.startTime = action.payload;
		},
		setEndTime: (state, action) => {
			state.endTime = action.payload;
		},
	},
});

export const { setStartTime, setEndTime } = fastingSlice.actions;

export default fastingSlice.reducer;
