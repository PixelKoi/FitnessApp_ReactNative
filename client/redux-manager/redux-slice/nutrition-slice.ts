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
      console.log("DEOS IT RN");
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(itemIndex, action.payload);
      // Item does not exist in the inventory, add it
      if (itemIndex === -1) {
        state.inventory.push(action.payload);
      } else {
        // Item already exists, update its quantity
        state.inventory[itemIndex].quantity = action.payload.quantity;
      }
    },
    reduceInventory: (state, action: PayloadAction<number>) => {
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1 && state.inventory[itemIndex].quantity > 1) {
        state.inventory[itemIndex].quantity = action.payload.quantity;
      } else if (itemIndex !== -1) {
        console.log("REMOVING ITEM?");
        state.inventory.splice(itemIndex, 1);
      }
    },
    // This deleteInventory is for the InventoryManager NOT(handleMinu/handlePlus)
    deleteInventory: (state, action: PayloadAction<number>) => {
      const itemIndex = state.inventory.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.inventory.splice(itemIndex, 1);
      }
    },
  },
});

export const { addInventory, reduceInventory, deleteInventory } =
  nutritionSlice.actions;
export default nutritionSlice.reducer;
