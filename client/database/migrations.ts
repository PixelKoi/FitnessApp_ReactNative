import {
  schemaMigrations,
  createTable,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
          name: "food",
          columns: [
            { name: "calories", type: "number" },
            { name: "carbs", type: "number" },
            { name: "fat", type: "number" },
            { name: "protein", type: "number" },
            { name: "description", type: "string" },
          ],
        }),
      ],
    },
  ],
});
