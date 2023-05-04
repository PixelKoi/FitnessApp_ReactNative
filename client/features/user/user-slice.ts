import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	name: string;
	age: number;
}

const initialState: UserState = {
	name: 'Jonathan Bajada',
	age: 0
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeName(state, action: PayloadAction<string>) {
			state.name = action.payload;
		},
		changeAge(state, action: PayloadAction<number>) {
			state.age = action.payload;
		}
	}
});

export const { changeName, changeAge } = userSlice.actions;

export default userSlice.reducer;
