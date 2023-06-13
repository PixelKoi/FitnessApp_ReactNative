import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	sessionID: string;
	name: string;
	age: number;
	gender: string;
	weight: number;
	height: number;
	activity: string;
	goal: number;
	loggedIn: boolean;
	bmr: number;
	dailyCal: number;
	email: string;
}

const initialState: UserState = {
	sessionID: "",
	name: "",
	age: 0,
	gender: "",
	weight: 0,
	height: 0,
	activity: "",
	goal: 1,
	bmr: 0,
	dailyCal: 0,
	loggedIn: false,
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setSessionID(state, action: PayloadAction<string>) {
			state.sessionID = action.payload;
		},
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
		changeGoal(state, action: PayloadAction<number>) {
			state.goal = action.payload;
		},
		changeBMR(state, action: PayloadAction<number>) {
			state.bmr = action.payload;
		},
		changeDailyCal(state, action: PayloadAction<number>) {
			state.dailyCal = action.payload;
		},
		changeEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		loggedIn(state, action: PayloadAction<Boolean>) {
			state.loggedIn = true;
		},
		loggedOff(state, action: PayloadAction<Boolean>) {
			state.loggedIn = false;
		},
		setUserStates(state, action) {
			return { ...state, ...action.payload };
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
	changeBMR,
	changeDailyCal,
	setUserStates,
	loggedIn,
	loggedOff,
	setSessionID,
} = userSlice.actions;

export default userSlice.reducer;
