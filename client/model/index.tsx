import Post from './Post'
import migrations from './migrations'
const database = new Database({
    // ...
    modelClasses: [Post],
})



const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
})