import { Model } from "@nozbe/watermelondb";
import { text, date, immutableRelation } from "@nozbe/watermelondb/decorators";

// Event(ID, JournalEntryID, startTime, endTime, duration, notes, mood, type)

export default class Event extends Model {
  static table = "events";
  static associations = {
    journals: { type: "belongs_to", key: "journals_id" },
  };
  @immutableRelation("journals", "journals_id") journals;
  @date("start_time")
  start_time;
  @date("end_time") end_time;
  @date("duration") duration;
  @text("notes") notes;
  @text("mood") mood;
  @text("type") type;

  static async createEvent(
    database,
    start_time,
    end_time,
    duration,
    notes,
    mood,
    type
  ) {
    try {
      const newEvent = await this.collections.get("events").create((events) => {
        events.start_time = start_time;
        events.end_time = end_time;
        events.duration = duration;
        events.notes = notes;
        events.mood = mood;
        events.type = type;
      });
      console.log("Events WRITER:", newEvent);
      return newEvent;
    } catch (error) {
      console.error("Error creating Event entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
