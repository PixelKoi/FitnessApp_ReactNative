import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";
import fastingReducer, { setStartDate } from "../features/user/fasting-slice";
import setFastingTimer from "../features/middleware/fasting-timer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		session: sessionReducer,
		fasting: fastingReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(setFastingTimer.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
