import { Model } from "@nozbe/watermelondb";
import { text, relation, date } from "@nozbe/watermelondb/decorators";

export default class JournalEntry extends Model {
  static table = "journals";
  static associations = {
    events: { type: "has_many", foreignKey: "journal_id" },
    foodEntry: { type: "has_many", foreignKey: "foodEntry_id" },
  };
  @text("user_id") user_id;
  @date("date") date;

  static async createJournalEntry(user_id, date) {
    try {
      const newJournals = await this.collections
        .get("journals")
        .create((journals) => {
          journals.user_id = user_id;
          journals.date = date;
        });
      console.log("Journal WRITER:", newJournals);
      return newJournals;
    } catch (error) {
      console.error("Error creating Journal entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
