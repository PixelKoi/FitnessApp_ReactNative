import { Model } from "@nozbe/watermelondb";
import { field, text, relation, writer } from "@nozbe/watermelondb/decorators";

export default class Food extends Model {
  static table = "foods";

  @text("calories") calories;
  @text("carbs") carbs;
  @text("fat") fat;
  @text("protein") protein;
  @text("description") description;

  @writer
  async completeDiary(calories, carbs, fat, protein, description) {
    try {
      const newDiary = await this.collections.get("foods").create((food) => {
        food.calories = calories;
        food.carbs = calories;
        food.fat = fat;
        food.protein = protein;
        food.description = description;
      });
      console.log("FOOD WRITER:", newDiary);
      return newDiary;
    } catch (error) {
      console.error("Error creating diary entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
