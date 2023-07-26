import { Model } from "@nozbe/watermelondb";
import { text, relation, date, writer } from "@nozbe/watermelondb/decorators";

export default class FoodEntry extends Model {
  static table = "foodEntrys";
  static associations = {
    journals: { type: "belongs_to", key: "journals_id" },
    meals: { type: "has_many", key: "meal_id" },
  };
  @text("water") water;

  @writer static async createFoodEntry(water) {
    try {
      const foodEntrys = await this.collections
        .get("foodEntrys")
        .create((foodEntrys) => {
          foodEntrys.water = water;
        });
      console.log("foodEntrys WRITER:", foodEntrys);
      return foodEntrys;
    } catch (error) {
      console.error("Error creating foodEntrys entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
