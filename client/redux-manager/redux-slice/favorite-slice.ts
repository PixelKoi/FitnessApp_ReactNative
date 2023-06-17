import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { values } from "@nozbe/watermelondb/utils/fp";

// Define the type for the favorite state
interface FavoriteState {
  Calories: number;
  Carbs: number;
  Fat: number;
  Protein: number;
  description: string;
  id: number;
}

const initialState = {
  foods: [],
};

const favSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload)
    },
  },
})

export const { addFavorite } = favSlice.actions;
export default favSlice.reducer;
