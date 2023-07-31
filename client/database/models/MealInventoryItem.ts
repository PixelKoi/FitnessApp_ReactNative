import { Model } from "@nozbe/watermelondb";
import { relation } from "@nozbe/watermelondb/decorators";

// DOCS MANY-TO-MANY REF: https://github.com/Nozbe/WatermelonDB/discussions/1149
export default class MealInventoryItem extends Model {
  static table = "mealInventoryItem";
  static associations = {
    meals: { type: "belongs_to", key: "meals_id" },
    inventoryItem: { type: "has_many", foreignKey: "inventoryItem_id" },
  };

  @relation("meals", "meals_id") meals;
  @relation("inventoryItem", "inventoryItem_id") inventoryItem;

  static async createMealInventoryItem(database, meals_id, inventoryItem_id) {
    try {
      const newMealInventoryItem = await database.collections
        .get("mealInventoryItem")
        .create((mealInventoryItem) => {
          mealInventoryItem.meals_id = meals_id;
          mealInventoryItem.inventoryItem_id = inventoryItem_id;
        });
      console.log("mealInventoryItem WRITER:", newMealInventoryItem);
      return newMealInventoryItem;
    } catch (error) {
      console.error("Error creating mealInventoryItem entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
