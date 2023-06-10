import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { addFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
