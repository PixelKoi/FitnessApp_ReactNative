import db from "./initialize-tables";
import { getUserIDByEmail } from "./profiles-table";

// Add a new profile into the profiles table
const logFastingRecordSQLite = async (email) => {
	const user_id = await getUserIDByEmail(email);
	const start_time = new Date().toISOString().replace("T", " ").slice(0, 19);

	db.transaction(
		(tx) => {
			tx.executeSql(
				"INSERT INTO fasting (user_id, start_time) VALUES (?, ?);",
				[user_id, start_time],
				(_, result) => {
					if (result.rowsAffected > 0) {
						console.log("Fasting record inserted successfully");
					} else {
						console.log("Failed to insert fasting record");
					}
				},
				(_, error) => {
					console.log(error.message);
					return true;
				}
			);
		},
		(error) => {
			console.log(error.message);
			return true;
		}
	);
};

const endCurrentFastingRecordSQLite = async (fastingData) => {
	const user_id = await getUserIDByEmail(fastingData.email);
	db.transaction(
		(tx) => {
			tx.executeSql(
				"INSERT INTO fasting (user_id, start_time) VALUES (?, ?);",
				[user_id, fastingData.start_time],
				(_, result) => {
					if (result.rowsAffected > 0) {
						console.log("Fasting record inserted successfully");
					} else {
						console.log("Failed to insert fasting record");
					}
				},
				(_, error) => {
					console.log(error.message);
					return true;
				}
			);
		},
		(error) => {
			console.log(error.message);
			return true;
		}
	);
};

const showAllFastingRecordsSQLite = () => {
	try {
		db.transaction(
			(tx) => {
				tx.executeSql(
					"SELECT * FROM fasting;",
					[],
					(_, result) => {
						const rows = result.rows;
						for (let i = 0; i < rows.length; i++) {
							const row = rows.item(i);
							console.log("Fasting Record:", row);
						}
					},
					(_, error) => {
						console.log(error.message);
						return true;
					}
				);
			},
			(error) => {
				console.log(error.message);
				return true;
			}
		);
	} catch (error) {
		console.error("Error retrieving fasting data:", error);
	}
};

export {
	logFastingRecordSQLite,
	endCurrentFastingRecordSQLite,
	showAllFastingRecordsSQLite,
};
