import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux-slice/user-slice";
import sessionReducer from "./redux-slice/session-slice";
import fastingReducer from "./redux-slice/fasting-slice";
import meditationReducer from "./redux-slice/meditation-slice";
import startFastingTimer from "./middleware/fasting-timer";
import startMeditationTimer from "./middleware/meditation-timer";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const reducers = combineReducers({
	user: userReducer,
	session: sessionReducer,
	fasting: fastingReducer,
	meditation: meditationReducer,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};
const fastingTimerMiddleware = startFastingTimer.middleware;
const meditationTimerMiddleware = startMeditationTimer.middleware;
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(fastingTimerMiddleware, meditationTimerMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
