import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface FastingState {
	startDay: string;
	endDay: string;
	startTime: Date;
	endTime: Date;
}

const initialState: FastingState = {
	startDay: format(new Date(), "MM-dd-yyyy"),
	endDay: format(new Date(), "MM-dd-yyyy"),
	startTime: new Date(),
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
