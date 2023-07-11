import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import schema from "./schema";
import Food from "./models/Food";
import Profile from "./models/Profile";
import Water from "./models/Water";

const adapter = new SQLiteAdapter({
	schema,
	migrations,
	// (optional database name or file system path)
	dbName: "myappss",
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
	modelClasses: [Food, Profile, Water],
});
