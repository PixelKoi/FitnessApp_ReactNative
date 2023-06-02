import fastingReducer, {
	setStartDate,
} from "../../features/user/fasting-slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

const setFastingTimer = createListenerMiddleware();

//Todo: figure how to getState of fasting state startDate and endDate
setFastingTimer.startListening({
	actionCreator: setStartDate,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState();
		const startDate = state.fasting.startDate;
		const endDate = state.fasting.endDate;
		const startTime = new Date(startDate).getTime();
		const endTime = new Date(endDate).getTime();
		console.log(startDate);
	},
});

export default setFastingTimer;
