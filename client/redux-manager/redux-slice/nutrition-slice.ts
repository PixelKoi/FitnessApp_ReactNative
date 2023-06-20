import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the favorite state
interface Nutrition {
  Calories: number;
  Carbs: number;
  Fat: number;
  Protein: number;
  description: string;
  id: number;
  quantity: number;
}

// Our FavoriteState is going to have a list of Favorites
interface InventoryState {
  inventory: Nutrition[];
}

const initialState: InventoryState = {
  inventory: [],
};

const nutritionSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addInventory: (state, action: PayloadAction<Nutrition>) => {
      state.inventory.push({
        ...action.payload,
      });
    },
  },
});

export const { addInventory } = nutritionSlice.actions;
export default nutritionSlice.reducer;
