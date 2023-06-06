// Import necessary dependencies
import { Model } from "@nozbe/watermelondb";
import { field, text, relation, writer } from "@nozbe/watermelondb/decorators";

// Define the Foods table schema
export default class Food extends Model {
  static table = "foods";

  // relationship templating
  // static associations = {
  //   calendar: { type: "has_many", foreignKey: "post_id" },
  // };

  // Define table fields
  //https://watermelondb.dev/docs/Model
  // Field type guarantees same type as input
  // Text extends field but removes whitespaces
  @text("calories") calories;
  @text("carbs") carbs;
  @text("fat") fat;
  @text("protein") protein;
  @text("description") description;

  @writer async completeDiary(calories, carbs, fat, protein, description) {
    const newDiary = await this.collections.get("foods").create((food) => {
      // food.calendar.set(this); (if we relating to a calendar?
      food.calories.set(calories);
      food.carbs.set(carbs);
      food.fat.set(fat);
      food.protein.set(protein);
      food.description.set(description);
    });
    return newDiary;
  }
}
