// Import necessary dependencies
import { Model } from "@nozbe/watermelondb";
import { field, relation, writer } from "@nozbe/watermelondb/decorators";

// Define the Foods table schema
export default class Food extends Model {
  static table = "foods";

  // Define table fields
  @field("calories") calories;
  @field("carbs") carbs;
  @field("fat") fat;
  @field("protein") protein;
  @field("description") description;

  @writer async createFood(objectData) {
    const new_food = await this.collections.get("foods").create((food) => {
      food.calories = objectData.Calories;
      food.carbs = objectData.Carbs;
      food.fat = objectData.Fat;
      food.protein = objectData.Protein;
      food.description = objectData.description;
    });
  }
}
