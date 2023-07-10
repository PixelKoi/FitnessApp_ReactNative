import { database } from "../index";

export const getAllTables = () => {
	const collections = database.collections;
	return collections;
};
