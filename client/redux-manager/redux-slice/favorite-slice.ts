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
      const itemIndex = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      // if item already exists, don't allow adding multiple times
      if (itemIndex === -1) {
        state.favorites.push({
          fav_id: state.favorites.length + 1,
          ...action.payload,
        });
      }
    },
    removeFavorite: (state, action: PayloadAction<Favorite>) => {
      const itemIndex = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      // if item already exists, don't allow adding multiple times
      if (itemIndex !== -1) {
        state.favorites.splice(itemIndex, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favSlice.actions;
export default favSlice.reducer;
