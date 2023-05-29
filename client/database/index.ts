import Post from './model/Post'
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import migrations from './model/migrations'
import { schemas } from "./schemas";


const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
})

export const database = new Database({
    adapter,
    modelClasses: [Post],
})


