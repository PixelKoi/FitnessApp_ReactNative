import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user-slice';
import counterReducer from '../features/counter/counter-slice';

export const store = configureStore({
	reducer: { user: userReducer, counter: counterReducer }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
