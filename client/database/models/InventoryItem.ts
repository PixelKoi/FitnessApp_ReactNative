import { Model } from "@nozbe/watermelondb";
import { text, writer, relation } from "@nozbe/watermelondb/decorators";

// Small Tutorial: https://www.youtube.com/watch?v=dXrJKc4sULs&ab_channel=reactify

export default class InventoryItem extends Model {
  static table = "inventoryItem";
  static associations = {
    mealInventoryItem: { type: "belongs_to", key: "mealInventoryItem_id" },
  };
  @relation("mealInventoryItem", "mealInventoryItem_id") mealInventoryItem;

  @text("calories")
  calories!: number;
  @text("carbs") carbs!: number;
  @text("fat") fat!: number;
  @text("protein") protein!: number;
  @text("description") description!: string;
  // @text("id") id;
  @text("quantity") quantity!: string;

  @writer async addInventoryItem(
    calories,
    carbs,
    fat,
    protein,
    description,
    quantity
  ) {
    try {
      const foodItem = this.collections.get("inventoryItem");
      const newItem = await foodItem.create((item) => {
        item.inventoryItem.set(this);
        item.calories = calories;
        item.carbs = carbs;
        item.fat = fat;
        item.protein = protein;
        item.description = description;
        // item.id = id;
        item.quantity = quantity;
      });
      console.log("Inventory Item WRITER:", newItem);
      return newItem;
    } catch (error) {
      console.error("Error creating ITEM entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
