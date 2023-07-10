import { database } from "../index";
import { writer, date, readonly } from "@nozbe/watermelondb/decorators";

export type Water = {
	glasses: number;
};

const water = database.collections.get("water");
//Detects any changes to the Water Table
export const observeWater = () => water.query().observe();

//Save water entry to table
export const setWaterIntake = async ({ glasses }: Water) => {
	await database.write(async () => {
		await database.collections.get("water").create((waterIntake) => {
			waterIntake.glasses = glasses;
		});
	});
};

export const createWaterIntakeRecord = async () => {
	await database.write(async () => {
		await database.get("water").create((waterIntake) => {
			waterIntake.glasses = 2;
		});
	});
};

//getWaterEntries
export const getWaterEntries = async () => {
	const collections = database.get("water");
	console.log(collections);
	return collections;
};
