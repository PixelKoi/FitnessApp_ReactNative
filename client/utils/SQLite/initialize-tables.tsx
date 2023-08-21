import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db");

db.transaction((tx) => {
	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS profiles (user_id INTEGER NOT NULL, name TEXT NOT NULL, age INTEGER NOT NULL, gender TEXT NOT NULL, height INTEGER NOT NULL, weight INTEGER NOT NULL, activity TEXT NOT NULL, goal_weight INTEGER NOT NULL, PRIMARY KEY (user_id));",
		[],
		() => console.log("create profiles table"),
		(_, error) => {
			console.log(error.message);
			return true;
		}
	);

	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS fasting (id INTEGER NOT NULL, user_id INTEGER NOT NULL, start_time INTEGER NOT NULL, end_time INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES profiles(user_id), PRIMARY KEY (id));",
		[],
		() => console.log("create fasting table"),
		(_, error) => {
			console.log(error.message);
			return true;
		}
	);
});

export default db;
