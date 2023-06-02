import {
	createSlice,
	PayloadAction,
	createListenerMiddleware,
} from "@reduxjs/toolkit";
import { produce } from "immer";

interface FastingState {
	elapsedPercentage: number;
	maxTime: number;
	startDate: string;
	endDate: string;
	countdown: string;
	// startDay: Date;
	// endDay: Date;
	// endTime: Date;
}

const initialState: FastingState = {
	elapsedPercentage: 0,
	maxTime: 1,
	startDate: "",
	endDate: "",
	countdown: "",
	// startDay: new Date(),
	// endDay: new Date(),
	// endTime: new Date(),
};

const fastingSlice = createSlice({
	name: "fasting",
	initialState,
	reducers: {
		setElapsedPercentage(state, action: PayloadAction<number>) {
			state.elapsedPercentage = action.payload;
		},
		setMaxTime(state, action: PayloadAction<number>) {
			state.maxTime = action.payload;
		},
		setStartDate(state, action: PayloadAction<string>) {
			state.startDate = action.payload;
		},
		setEndDate(state, action: PayloadAction<string>) {
			state.endDate = action.payload;
		},
	},
});

export const { setElapsedPercentage, setMaxTime, setStartDate, setEndDate } =
	fastingSlice.actions;

export default fastingSlice.reducer;

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: setStartDate,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState();
		const startDate = state.fasting.startDate;
		const endDate = state.fasting.endDate;
		const startTime = new Date(startDate).getTime();
		const endTime = new Date(endDate).getTime();

		console.log(startTime);
	},
});
