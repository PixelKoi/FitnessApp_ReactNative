// User(ID, Email, name, membershipStatus, weight, height)
// JournalEntry(ID, UserID, Date, FoodEntryID, EventID)
// FoodEntry(ID, JournalEntryID)
// Meal(ID, MealCategory, FoodID)
// MealInventoryItem(MealID, InventoryItemID)
// InventoryItem(ID, Macros, Calories, Description, Quantity, Water)
// Event(ID, JournalEntryID, startTime, endTime, duration, notes, mood, type)

import { Model } from "@nozbe/watermelondb";
import { field, text, relation, writer } from "@nozbe/watermelondb/decorators";

export default class InventoryItem extends Model {
  static table = "foods";

  @text("calories") calories;
  @text("carbs") carbs;
  @text("fat") fat;
  @text("protein") protein;
  @text("description") description;
  @text("quantity") quantity;
  @text("water") water;

  @writer
  async completeDiary(calories, carbs, fat, protein, description, quantity) {
    try {
      const newDiary = await this.collections.get("foods").create((food) => {
        food.calories = calories;
        food.carbs = carbs;
        food.fat = fat;
        food.protein = protein;
        food.description = description;
        food.quantity = quantity;
        food.water = water;
      });
      console.log("FOOD WRITER:", newDiary);
      return newDiary;
    } catch (error) {
      console.error("Error creating Nutrition entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
