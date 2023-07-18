import { database } from "./db";

// this is just an example, actual data will come from your application
let exampleData = {
  journalEntryID: "abc123",
  meals: [
    {
      mealCategory: "Breakfast",
      inventoryItems: [
        {
          carbs: "xyz",
          fat: "xyz",
          protein: "xyz",
          calories: 500,
          description: "Eggs",
          quantity: 2,
        },
        {
          carbs: "xyz",
          fat: "xyz",
          protein: "xyz",
          calories: 300,
          description: "Bacon",
          quantity: 3,
        },
        // more items...
      ],
    },
    {
      mealCategory: "Lunch",
      inventoryItems: [
        {
          carbs: "xyz",
          fat: "xyz",
          protein: "xyz",
          calories: 700,
          description: "Chicken",
          quantity: 1,
        },
        {
          carbs: "xyz",
          fat: "xyz",
          protein: "xyz",
          calories: 200,
          description: "Salad",
          quantity: 1,
        },
      ],
    },
  ],
};

export const foodEntry = async (props) => {
  database.write(async () => {
    let foodEntry = await database.get("food_entries").create((foodEntry) => {
      foodEntry.journal_entry_id = exampleData.journalEntryID;
      foodEntry.water = props.water; // Set the water value from props
    });

    for (let mealData of exampleData.meals) {
      let meal = await database.get("meals").create((meal) => {
        meal.food_entry_id = foodEntry.id;
        meal.meal_category = mealData.mealCategory;
      });

      for (let itemData of mealData.inventoryItems) {
        await database.get("inventory_items").create((item) => {
          item.carbs = itemData.carbs;
          item.protein = itemData.protein;
          item.fat = itemData.fat;
          item.calories = itemData.calories;
          item.description = itemData.description;
          item.quantity = itemData.quantity;
        });

        await database.get("meal_inventory_item").create((mii) => {
          mii.meal_id = meal.id;
          mii.inventory_item_id = item.id;
        });
      }
    }
  });
};
