import db from "./initialize-tables";

// Add a new profile into the profiles table
const logFastingRecordSQLite = (fastingData) => {
	db.transaction(
		(tx) => {
			tx.executeSql(
				"INSERT INTO fasting (user_id, start_time, end_time) VALUES (?, ?, ?);",
				[fastingData.user_id, fastingData.start_time, fastingData.end_time],
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

export { logFastingRecordSQLite };
