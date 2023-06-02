import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";
import fastingReducer, { setStartDate } from "../features/user/fasting-slice";

const listenerMiddleware = createListenerMiddleware();

//Todo: figure how to getState of fasting state startDate and endDate
listenerMiddleware.startListening({
	actionCreator: setStartDate,
	effect: async (action, listenerApi) => {
		const state = listenerApi.getState();
		const startDate = state.fasting.startDate;
		const endDate = state.fasting.endDate;
		const startTime = new Date(startDate).getTime();
		const endTime = new Date(endDate).getTime();
	},
});

export const store = configureStore({
	reducer: {
		user: userReducer,
		session: sessionReducer,
		fasting: fastingReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
