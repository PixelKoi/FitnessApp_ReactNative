import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";
import fastingReducer, {
	setElapsedPercentage,
} from "../features/user/fasting-slice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: setElapsedPercentage,
	effect: async (action, listenerApi) => {},
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
