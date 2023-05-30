import { createSlice } from "@reduxjs/toolkit";

interface FastingState {
	// startDay: Date;
	// endDay: Date;
	// startTime: Date;
	// endTime: Date;
}

const initialState: FastingState = {
	// startDay: new Date(),
	// endDay: new Date(),
	// startTime: new Date(),
	// endTime: new Date(),
};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {},
});

export const { setStartTime, setEndTime } = fastingSlice.actions;

export default fastingSlice.reducer;
