import { database } from "../index";
import { writer, date, readonly } from "@nozbe/watermelondb/decorators";

export type Water = {
	glasses: number;
};

const water = database.collections.get("water");
//Detects any changes to the Water Table
export const observeWater = () => water.query().observe();

//Check for record today and return boolean
const checkIfRecordedToday = async () => {
	const getTodaysRecord = await database.collections.get("water").query();
	return;
};

//Create water entry
export const createWaterIntakeRecord = async ({ glasses }: Water) => {
	await database.write(async () => {
		const water = await database.collections.get("water");
		await water.create((waterIntake) => {
			waterIntake.glasses = glasses;
		});
	});
};

//getWaterEntries
export const getWaterEntries = async () => {
	const allWater = await database.get("water").query().fetch();
	console.log(allWater);
	return allWater;
};
