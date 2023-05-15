interface ColumnDefinition {
	[columnName: string]: string;
}

interface TableDefinition {
	name: string;
	columns: ColumnDefinition;
}

interface DatabaseSchema {
	tables: TableDefinition[];
}

const schema: DatabaseSchema = {
	tables: [
		{
			name: "users",
			columns: {
				id: "INTEGER PRIMARY KEY AUTOINCREMENT",
				name: "TEXT",
				email: "TEXT",
			},
		},
		{
			name: "products",
			columns: {
				id: "INTEGER PRIMARY KEY AUTOINCREMENT",
				name: "TEXT",
				price: "REAL",
			},
		},
	],
};

export default schema;
