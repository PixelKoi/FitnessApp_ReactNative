import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store";

interface FoodItem {
  Calories: number;
  Carbs: number;
  Fat: number;
  Protein: number;
  description: string;
  id: number;
  isSelected: boolean;
  quantity: number;
}

interface FavoriteState {
  favorites: FoodItem[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FoodItem>) => {
      state.favorites.push(action.payload);
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
