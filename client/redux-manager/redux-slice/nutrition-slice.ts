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

// REDUCERS
// 1. addInventory: id EXISTS && quantity > 0, INCREMENT quantity ELSE id !EXISTS push obj to array
// 2. reduceInventory: ID Match && quantity > 1, DECREMENT quantity ELSE quantity = 0 PROC deleteInventory
// 3. deleteInventory: Remove ID Match from inventory ARRAY
const nutritionSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addInventory: (state, action: PayloadAction<Nutrition>) => {
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1 && action.payload.quantity > 0) {
        state.inventory[itemIndex].quantity += action.payload.quantity;
      } else if (itemIndex === -1) {
        state.inventory.push(action.payload);
      }
    },
    reduceInventory: (state, action: PayloadAction<number>) => {
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1 && state.inventory[itemIndex].quantity > 1) {
        state.inventory[itemIndex].quantity -= 1;
      } else if (
        itemIndex !== -1 &&
        state.inventory[itemIndex].quantity === 1
      ) {
        state.inventory.splice(itemIndex, 1);
      }
    },
    deleteInventory: (state, action: PayloadAction<number>) => {
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        state.inventory.splice(itemIndex, 1);
      }
    },
  },
});

export const { addInventory } = nutritionSlice.actions;
export default nutritionSlice.reducer;
