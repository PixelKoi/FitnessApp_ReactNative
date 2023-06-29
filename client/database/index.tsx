import * as SQLite from "expo-sqlite";
import { showAllUsers } from "./testQueries";
import schema from "./schema";

// Open or create the SQLite database
const db = SQLite.openDatabase("db.db");

// Initialize the SQLite database
export const initializeDatabase = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)",
			[],
			() => console.log("create users table"),
			(_, error) => {
				console.log(error.message);
				return true;
			}
		);
	});
};

export default db;

