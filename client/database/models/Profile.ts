import { Model } from "@nozbe/watermelondb";
import { field, text, relation, writer } from "@nozbe/watermelondb/decorators";

export default class Profile extends Model {
  static table = "profiles";

  @text("username") username;
  @text("age") age;
  @text("gender") gender;
  @text("height") height;
  @text("weight") weight;
  @text("activity") activity;
  @text("goal") goal;

  @writer
  async completeProfile(username, age, gender, height, weight, activity, goal) {
    try {
      const newProfile = await this.collections
        .get("foods")
        .create((profile) => {
          profile.username = username;
          profile.age = age;
          profile.gender = gender;
          profile.height = height;
          profile.weight = weight;
          profile.activity = activity;
          profile.goal = goal;
        });
      console.log("Profile WRITER:", newProfile);
      return newProfile;
    } catch (error) {
      console.error("Error creating Profile entry:", error);
      throw error; // Rethrow the error or handle it as per your application's requirements
    }
  }
}
