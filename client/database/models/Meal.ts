import { Model } from "@nozbe/watermelondb";
import { text, immutableRelation } from "@nozbe/watermelondb/decorators";

export default class Meal extends Model {
  static table = "meals";
  static associations = {
    foodEntry: { type: "belongs_to", key: "foodEntry_id" },
    mealInventoryItem: { type: "has_many", key: "mealInventoryItem_id" },
  };

  @immutableRelation("foodEntry", "foodEntry_id")
  @immutableRelation("mealInventoryItem", "mealInventoryItem_id")
  @text("meal_category")
  meal_category;

  static async Meal(meal_category) {
    try {
      const meals = await this.collections.get("meals").create((meals) => {
        meals.meal_category = meal_category;
      });
      console.log("meals WRITER:", meals);
      return meals;
    } catch (error) {
      console.error("Error creating meals entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
