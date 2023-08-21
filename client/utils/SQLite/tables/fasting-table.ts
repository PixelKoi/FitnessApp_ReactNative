import db from "../initialize-tables";
import { getUserIDByEmail } from "./profiles-table";

//create a fasting record
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

//end current fasting record
const endCurrentFastingRecordSQLite = async (email) => {
	const user_id = await getUserIDByEmail(email);
	const end_time = new Date().toISOString().replace("T", " ").slice(0, 19);

	db.transaction(
		(tx) => {
			tx.executeSql(
				"SELECT id, start_time, end_time FROM fasting WHERE user_id = ? AND end_time IS NULL ORDER BY start_time DESC LIMIT 1;",
				[user_id],
				(_, result) => {
					const row = result.rows.item(0);
					if (row) {
						const fasting_id = row.id;
						const start_time = row.start_time;
						const startTimestamp = new Date(start_time).getTime();
						const endTimestamp = new Date(end_time).getTime();
						const duration_ms = endTimestamp - startTimestamp;
						const duration_minutes = Math.floor(duration_ms / (1000 * 60));

						tx.executeSql(
							"UPDATE fasting SET end_time = ?, duration_minutes = ? WHERE id = ?;",
							[end_time, duration_minutes, fasting_id],
							(_, updateResult) => {
								if (updateResult.rowsAffected > 0) {
									console.log("Fasting record ended successfully");
								} else {
									console.log("Failed to end fasting record");
								}
							},
							(_, error) => {
								console.log(error.message);
								return true;
							}
						);
					} else {
						console.log("No active fasting record found");
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
