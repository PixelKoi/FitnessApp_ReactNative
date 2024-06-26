import { Model } from "@nozbe/watermelondb";
import { text, writer } from "@nozbe/watermelondb/decorators";

export default class InventoryItem extends Model {
  static table = "inventoryItem";
  static associations = {
    journals: { type: "belongs_to", key: "events_id" },
  };

  @text("calories") calories;
  @text("carbs") carbs;
  @text("fat") fat;
  @text("protein") protein;
  @text("description") description;
  @text("quantity") quantity;

  @writer
  async createInventoryItem(
    calories,
    carbs,
    fat,
    protein,
    description,
    quantity
  ) {
    try {
      const newItem = await this.collections.get("foods").create((item) => {
        item.calories = calories;
        item.carbs = carbs;
        item.fat = fat;
        item.protein = protein;
        item.description = description;
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
