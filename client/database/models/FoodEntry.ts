import { Model } from "@nozbe/watermelondb";
import { text, relation, date, writer } from "@nozbe/watermelondb/decorators";

export default class FoodEntry extends Model {
  static table = "foodEntry";
  static associations = {
    journals: { type: "belongs_to", key: "journals_id" },
    meals: { type: "has_many", key: "meals_id" },
  };
  @relation("journals", "journals_id")
  @relation("meals", "meals_id")
  @text("water")
  water;

  @writer static async createFoodEntry(water) {
    try {
      const foodEntry = await this.collections
        .get("foodEntry")
        .create((data) => {
          data.water = water;
        });
      console.log("foodEntries WRITER:", foodEntry);
      return foodEntry;
    } catch (error) {
      console.error("Error creating foodEntry entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
