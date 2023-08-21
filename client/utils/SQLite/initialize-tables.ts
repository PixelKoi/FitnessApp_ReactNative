import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db4");

db.transaction((tx) => {
	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS profiles (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL, age INTEGER NOT NULL, gender TEXT NOT NULL, height INTEGER NOT NULL, weight INTEGER NOT NULL, activity TEXT NOT NULL, goal INTEGER NOT NULL);",
		[],
		() => console.log("Created profiles table"),
		(_, error) => {
			console.log(error.message);
			return true; // Return true to roll back the transaction in case of an error
		}
	);

	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS fasting (id INTEGER NOT NULL, user_id INTEGER NOT NULL, start_time DATETIME NOT NULL, end_time DATETIME, duration INTEGER, FOREIGN KEY (user_id) REFERENCES profiles(user_id), PRIMARY KEY (id));",
		[],
		() => console.log("create fasting table"),
		(_, error) => {
			console.log(error.message);
			return true;
		}
	);
});

export default db;
