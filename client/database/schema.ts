// model/schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb";
// FoodEntry(ID, JournalEntryID)
// User(ID, Email, name, membershipStatus, weight, height)
// JournalEntry(ID, UserID, Date, FoodEntryID, EventID)
// FoodEntry(ID, JournalEntryID)
// Meal(ID, MealCategory, FoodID)
// MealInventoryItem(MealID, InventoryItemID)
// InventoryItem(ID, Macros, Calories, Description, Quantity, Water)
// Event(ID, JournalEntryID, startTime, endTime, duration, notes, mood, type)
export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "weights",
      columns: [
        { name: "weight", type: "number" },
        { name: "created_at", type: "number" },
        { name: "note", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "comments",
      columns: [
        { name: "body", type: "string" },
        { name: "post_id", type: "string", isIndexed: true },
      ],
    }),
    tableSchema({
      name: "water",
      columns: [{ name: "glasses", type: "number" }],
    }),
    tableSchema({
      name: "foods",
      columns: [
        { name: "calories", type: "number" },
        { name: "carbs", type: "number" },
        { name: "fat", type: "number" },
        { name: "protein", type: "number" },
        { name: "description", type: "string" },
      ],
    }),
    tableSchema({
      name: "profiles",
      columns: [
        { name: "user_id", type: "string", isIndexed: true },
        { name: "username", type: "string" },
        { name: "age", type: "number" },
        { name: "gender", type: "string" },
        { name: "height", type: "number" },
        { name: "weight", type: "number" },
        { name: "activity", type: "string" },
        { name: "goal", type: "number" },
      ],
    }),
  ],
});
