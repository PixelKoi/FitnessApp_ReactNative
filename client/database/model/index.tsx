import Post from './'
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import migrations from './migrations'
import { schemas } from "./schemas";


const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
})

const database = new Database({
    // ...
    modelClasses: [Post],
})


