import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

interface MedState {
	elapsedPercentage: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	// startDay: Date;
	// endDay: Date;
	// endTime: Date;
}

const initialState: MedState = {
	elapsedPercentage: 0,
	maxTime: 1,
	startDate: "",
	endDate: "",
	// startDay: new Date(),
	// endDay: new Date(),
	// endTime: new Date(),
};

const medSlice = createSlice({
	name: "meditation",
	initialState,
	reducers: {},
});

export const {} = medSlice.actions;

export default medSlice.reducer;
