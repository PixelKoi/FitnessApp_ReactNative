import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux-slice/user-slice";
import sessionReducer from "./redux-slice/session-slice";
import fastingReducer from "./redux-slice/fasting-slice";
import favoriteReducer from "./redux-slice/favorite-slice";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
const reducers = combineReducers({
  user: userReducer,
  session: sessionReducer,
  fasting: fastingReducer,
  meditation: meditationReducer,
  favorite: favoriteReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

// Persist https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

//Custom Middleware
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
