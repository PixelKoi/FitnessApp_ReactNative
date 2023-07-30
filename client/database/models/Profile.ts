import { Model } from "@nozbe/watermelondb";
import { field, text, relation, writer } from "@nozbe/watermelondb/decorators";

// DATA MODEL
// FoodEntry(ID, JournalEntryID)
// User(ID, Email, name, membershipStatus, weight, height)
// JournalEntry(ID, UserID, Date, FoodEntryID, EventID)
// FoodEntry(ID, JournalEntryID)
// Meal(ID, MealCategory, FoodID)
// MealInventoryItem(MealID, InventoryItemID)
// InventoryItem(ID, Macros, Calories, Description, Quantity, Water)
// Event(ID, JournalEntryID, startTime, endTime, duration, notes, mood, type)

// InventoryItem Table (JUNCTION TABLE (MealInventoryItem Table) MANY-TO-MANY relationship) hooks with Meal Table
// FoodEntry holds many Meal, so FoodEntry-to-Meal One-to-Many, only one foodEntry a day
// Event can hold both the meditation and fasting tables, can have multiple Event entries in our Journal Entry
//JournalEntry (One a day)
// User Table in Sum-app.pdf is an alias for the Profile table... (needs to be renamed in the documentation)

export default class Profile extends Model {
  static table = "profiles";

  @text("username") username;
  @text("age") age;
  @text("gender") gender;
  @text("height") height;
  @text("weight") weight;
  @text("activity") activity;
  @text("goal") goal;

  @writer
  async completeProfile(username, age, gender, height, weight, activity, goal) {
    try {
      const newProfile = await this.collections
        .get("foods")
        .create((profile) => {
          profile.username = username;
          profile.age = age;
          profile.gender = gender;
          profile.height = height;
          profile.weight = weight;
          profile.activity = activity;
          profile.goal = goal;
        });
      console.log("Profile WRITER:", newProfile);
      return newProfile;
    } catch (error) {
      console.error("Error creating Profile entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
