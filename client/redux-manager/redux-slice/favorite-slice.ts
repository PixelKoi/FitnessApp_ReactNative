import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteState {
  favorites: {
    id: number;
    isSelected: boolean;
    quantity: number;
    food: {
      Calories: number;
      Carbs: number;
      Fat: number;
      Protein: number;
      description: string;
    };
  };
}

const initialState: FavoriteState = {
  favorites: {
    id: 0,
    isSelected: true,
    quantity: 0,
    food: {
      Calories: 0,
      Carbs: 0,
      Fat: 0,
      Protein: 0,
      description: "string",
    },
  },
};
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Object>) => {
      state.favorites = [...state.favorites, action.payload]; // Append the new favorite item to the favorites array
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
