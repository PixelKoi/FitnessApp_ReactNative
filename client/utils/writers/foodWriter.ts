import { useDatabase } from "@nozbe/watermelondb/hooks";
import React, { useEffect } from "react";
import FoodEntry from "../../database/models/FoodEntry";
import Meal from "../../database/models/Meal";
import InventoryItem from "../../database/models/InventoryItem";
import MealInventoryItem from "../../database/models/MealInventoryItem";
import Food from "../../database/models/Food";

const FoodWriter = ({
  journalEntryID,
  breakfast,
  lunch,
  dinner,
  snacks,
  water,
}) => {
  useEffect(() => {
    const foodEntry = async () => {
      const database = useDatabase();

      return await database.write(async () => {
        const foodEntry = await database
          .get<FoodEntry>("foodEntrys")
          .create((data) => {
            data.createFoodEntry(
              (data.journals_id = journalEntryID),
              (data.water = water)
            );
          });

        const createMeal = async (mealCategory, items) => {
          const meal = await database.get<Meal>("meals").create((data) => {
            data.Meal(
              (data.food_entry_id = foodEntry.id),
              (data.meal_category = mealCategory)
            );
          });

          for (let itemData of items) {
            await database
              .get<InventoryItem>("inventory_items")
              .create((item) => {
                item.createInventoryItem(
                  (item.carbs = itemData.Carbs),
                  (item.protein = itemData.Protein),
                  (item.fat = itemData.Fat),
                  (item.calories = itemData.Calories),
                  (item.description = itemData.description),
                  (item.quantity = itemData.quantity)
                );
              });

            await database
              .get<MealInventoryItem>("meal_inventory_item")
              .create((data) => {
                data.createMealInventoryItem(
                  (data.meal_id = meal.id),
                  (data.inventory_item_id = item.id)
                );
              });
          }
        };

        if (breakfast && breakfast.length > 0) {
          await createMeal("BREAKFAST", breakfast);
        }

        if (lunch && lunch.length > 0) {
          await createMeal("lunch", lunch);
        }

        if (dinner && dinner.length > 0) {
          await createMeal("dinner", dinner);
        }

        if (snacks && snacks.length > 0) {
          await createMeal("snacks", snacks);
        }

        return foodEntry;
      });
    };

    // Call the foodEntry function when the component mounts
    foodEntry();
  }, [journalEntryID, breakfast, lunch, dinner, snacks, water]);
};

export default FoodWriter;
