import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteState {
  food: {
    Calories: number;
    Carbs: number;
    Fat: number;
    Protein: number;
    description: string;
    id: number;
    isSelected: boolean;
    quantity: number;
  };
}

const initialState: FavoriteState = {
  food: {
    id: 0,
    isSelected: true,
    quantity: 0,
    Calories: 0,
    Carbs: 0,
    Fat: 0,
    Protein: 0,
    description: "string",
  },
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action) {
      return { ...state, ...action.payload }; // Append the new favorite item to the favorites array
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const foodIndex = action.payload;
      state.favorites[foodIndex].isSelected =
        !state.favorites[foodIndex].isSelected;

      // Save updated favorites to AsyncStorage
      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
