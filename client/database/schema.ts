// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'weights',
            columns: [
                {name: 'weight', type: 'number'},
                {name: 'created_at', type: 'number'},
                {name: 'note', type: 'string', isOptional: true},
            ],
        }),
        tableSchema({
            name: 'comments',
            columns: [
                { name: 'body', type: 'string' },
                { name: 'post_id', type: 'string', isIndexed: true },
            ]
        }),
    ]
})