import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";
import fastingReducer from "../features/user/fasting-slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		session: sessionReducer,
		fasting: fastingReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
