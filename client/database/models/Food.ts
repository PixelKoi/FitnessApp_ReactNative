import { Model } from "@nozbe/watermelondb";
import { text, writer } from "@nozbe/watermelondb/decorators";

export default class Food extends Model {
  static table = "foods";
  // https://github.com/Nozbe/WatermelonDB/issues/1598

  @text("calories") calories;
  @text("carbs") carbs;
  @text("fat") fat;
  @text("protein") protein;
  @text("description") description;

  @writer async addFood(calories, carbs, fat, protein, description) {
    try {
      // const foodItem = this.collections.get("foods");
      await this.collections.get("food").create((food) => {
        food.calories = calories;
        food.carbs = carbs;
        food.fat = fat;
        food.protein = protein;
        food.description = description;
      });
    } catch (error) {
      console.error("Error creating Nutrition entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
