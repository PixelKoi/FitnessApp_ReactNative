import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	name: string;
	age: number;
	gender: string;
	weight: number;
	height: number;
	activity: string;
	goal: string;
	loggedIn: boolean;
}

const initialState: UserState = {
	name: "Jonathan Bajada",
	age: 0,
	gender: "male",
	weight: 0,
	height: 0,
	activity: "",
	goal: "",
	loggedIn: false,
};

const userSlice = createSlice({
	name: "user",
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
		},
		changeActivity(state, action: PayloadAction<string>) {
			state.activity = action.payload;
		},
		changeGoal(state, action: PayloadAction<string>) {
			state.goal = action.payload;
		},
		loggedIn(state, action: PayloadAction<Boolean>) {
			state.loggedIn = true;
		},
		loggedOff(state, action: PayloadAction<Boolean>) {
			state.loggedIn = false;
		},
	},
});

export const {
	changeName,
	changeAge,
	changeGender,
	changeWeight,
	changeHeight,
	changeActivity,
	changeGoal,
	loggedIn,
	loggedOff,
} = userSlice.actions;

export default userSlice.reducer;
