import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import migrations from "./migrations";
import Weight from './model/weight';
import schema from './schema';

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    onSetUpError: error => {
        console.log("DB FAILED TO LOAD")
        console.log(error)
        // Database failed to load -- offer the user to reload the app or log out
    }
});

export const database = new Database({
    adapter,
    modelClasses: [Weight],
});