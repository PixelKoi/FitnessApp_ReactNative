import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import schema from "./schema";
import Profile from "./models/Profile";
import Event from "./models/Event";
import Meal from "./models/Meal";
import MealInventoryItem from "./models/MealInventoryItem";
import FoodEntry from "./models/FoodEntry";
import JournalEntry from "./models/JournalEntry";
import InventoryItem from "./models/InventoryItem";
import Food from "./models/Food";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  // (optional database name or file system path)
  dbName: "wmdb",
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  // jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error) => {
    console.log("DB FAILED TO LOAD");
    console.log(error);
    // Database failed to load -- offer the redux-slice to reload the redux-manager or log out
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Profile,
    Event,
    Meal,
    MealInventoryItem,
    FoodEntry,
    JournalEntry,
    InventoryItem,
    Food,
  ],
});

// Close active connections (important)
// database.unsafeResetDatabase(); // Reset the database
// DB LOCALTION:  Opened database at
// /Users/garonazarian/Library/Developer/CoreSimulator/Devices/B6EE0E42-D359-4EA8-87F3-C2182ADB2848/data/Containers/Data/Application/B0260577-95D4-4BFB-A630-ABD92550090D/Documents/wmdb.db
