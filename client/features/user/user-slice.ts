import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	name: string;
	age: number;
	gender: string;
	weight: number;
	height: number;
	activity: number;
	goal: number
}

const initialState: UserState = {
	name: 'Jonathan Bajada',
	age: 0,
	gender: 'male',
	weight: 0,
	height: 0,
	activity: 0,
	goal: 0
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
		},
		changeGender(state, action: PayloadAction<string>) {
			state.gender = action.payload;
		},
		changeWeight(state, action: PayloadAction<number>) {
			state.weight = action.payload;
		},
		changeHeight(state, action: PayloadAction<number>) {
			state.height = action.payload;
		}
	}
});

export const { changeName,changeAge,changeGender,changeWeight, changeHeight} = userSlice.actions;

export default userSlice.reducer;
