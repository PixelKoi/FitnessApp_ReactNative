import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux-slice/user-slice";
import sessionReducer from "./redux-slice/session-slice";
import fastingReducer from "./redux-slice/fasting-slice";
import favSlice from "./redux-slice/favorite-slice";
import nutritionSlice from "./redux-slice/nutrition-slice";
import themeSlice from "./redux-slice/theme-slice";
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
  favorite: favSlice,
  inventory: nutritionSlice,
  theme: themeSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  // whitelist: ["favorite", "theme"], // Specify the reducer to persist
  whitelist: ["favorite", "theme", "inventory"], // Specify the reducer to persist
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

console.log("GETTING STORE STATE", store.getState());
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
