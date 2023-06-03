import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";
import fastingReducer from "../features/user/fasting-slice";
import meditationReducer from "../features/user/meditation-slice";
import startFastingTimer from "../features/middleware/fasting-timer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		session: sessionReducer,
		fasting: fastingReducer,
		meditation: meditationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(startFastingTimer.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
