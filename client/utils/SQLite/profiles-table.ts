import db from "./initialize-tables";

// Add a new profile into the profiles table
const createProfileSQLite = (profileData) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO profiles (username, email, age, gender, height, weight, activity, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
			[
				profileData.username,
				profileData.email,
				profileData.age,
				profileData.gender,
				profileData.height,
				profileData.weight,
				profileData.activity,
				profileData.goal,
			],
			(_, result) => {
				if (result.rowsAffected > 0) {
					console.log("Profile added successfully");
				} else {
					console.log("Failed to add profile");
				}
			},
			(_, error) => {
				console.log(error.message);
				return true; // Return true to roll back the transaction in case of an error
			}
		);
	});
};

const getUserIDByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					"SELECT user_id FROM profiles WHERE email = ?;",
					[email],
					(_, result) => {
						if (result.rows.length > 0) {
							const user_id = result.rows.item(0).user_id;
							resolve(user_id);
						} else {
							resolve(null); // No matching user found
						}
					},
					(_, error) => {
						console.log(error.message);
						reject(error);
						return true;
					}
				);
			},
			(error) => {
				console.log(error.message);
				reject(error);
				return true;
			}
		);
	});
};

export { createProfileSQLite, getUserIDByEmail };
