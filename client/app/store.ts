import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user-slice";
import sessionReducer from "../features/user/session-slice";

export const store = configureStore({
	reducer: { user: userReducer, session: sessionReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
