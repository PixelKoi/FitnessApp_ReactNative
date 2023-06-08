import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux-slice/user-slice";
import sessionReducer from "./redux-slice/session-slice";
import fastingReducer from "./redux-slice/fasting-slice";
import meditationReducer from "./redux-slice/meditation-slice";
import startFastingTimer from "../components/middleware/fasting-timer";
import startMeditationTimer from "../components/middleware/meditation-timer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    session: sessionReducer,
    fasting: fastingReducer,
    meditation: meditationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      startFastingTimer.middleware,
      startMeditationTimer.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
