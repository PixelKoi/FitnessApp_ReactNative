import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the favorite state
interface Favorite {
  Calories: number;
  Carbs: number;
  Fat: number;
  Protein: number;
  description: string;
  id: number;
  fav_id: number;
}

// Our FavoriteState is going to have a list of Favorites
interface FavoriteState {
  favorites: Favorite[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push({
        fav_id: state.favorites.length + 1,
        ...action.payload,
      });
    },
  },
});

export const { addFavorite } = favSlice.actions;
export default favSlice.reducer;
