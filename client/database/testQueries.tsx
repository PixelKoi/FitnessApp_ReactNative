import { openDatabase } from "expo-sqlite";
import db from "./index";

const getUsers = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table'",
				[],
				(_, { rows }) => {
					const tableNames = rows._array.map((row) => row.name);
					resolve(tableNames);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const showAllUsers = (db) => {
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM users",
			[],
			(_, result) => {
				const { rows } = result;
				if (rows.length > 0) {
					console.log("All Users:");
					for (let i = 0; i < rows.length; i++) {
						const { id, name, email } = rows.item(i);
						console.log(`ID: ${id}, Name: ${name}, Email: ${email}`);
					}
				} else {
					console.log("No users found");
				}
			},
			(_, error) => {
				console.log(error.message);
				return true;
			}
		);
	});
};

export const insertUser = (name, email) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO users (name, email) VALUES (?, ?)",
			[name, email],
			() => console.log("User inserted successfully"),
			(_, error) => {
				console.log(error.message);
				return true;
			}
		);
	});
};

export const getNameByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT name FROM users WHERE email = ?",
				[email],
				(_, result) => {
					const { rows } = result;
					if (rows.length > 0) {
						const { name } = rows.item(0);
						resolve(name);
					} else {
						resolve(null);
					}
				},
				(_, error) => {
					reject(error);
					return true;
				}
			);
		});
	});
};
