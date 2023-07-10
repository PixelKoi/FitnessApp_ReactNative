import { Model } from "@nozbe/watermelondb";
import { field, writer, date, readonly } from "@nozbe/watermelondb/decorators";

export default class Water extends Model {
	static table = "water";

	// static associations = {
	// 	profiles: { type: "has_many", foreignKey: "user_id" },
	// };

	@field("glasses") glasses;
}
