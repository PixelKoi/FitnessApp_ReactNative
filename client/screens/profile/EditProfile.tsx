import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface } from "react-native-paper";
//Import redux
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
//Import Icons
import Icon from "react-native-vector-icons/FontAwesome";
import { UserCircleIcon } from "react-native-heroicons/outline";
import Profile from "../../database/models/Profile";
import calAlgo from "./cal-algo";
import { supabase } from "../../utils/supabase_authentication/supabase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import ActivityPickerModal from "./modals/ActivityPickerModal";
import WeightPickerModal from "./modals/WeightPickerModal";
import WeeklyGoalModal from "./modals/WeeklyGoalModal";
import { Svg, Path } from "react-native-svg";

const UserBioInput = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  //Initiate user redux states
  const {
    sessionID,
    email,
    gender,
    weight,
    height,
    age,
    name,
    activity,
    goal,
    bmr,
    dailyCal,
  } = useAppSelector((state) => state.user);
  const { colors } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  //Edit Profile Hooks
  const [showEditProfile, setEditProfile] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  //Create Calorie Param object for calAlgo function
  const calParams = {
    age: age,
    gender: gender,
    weight: weight,
    height: height,
    activity: activity,
    goal: goal,
  };

  const [loading, setLoading] = useState(true);
  async function updateProfile(
    username: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    activity: string,
    goal: number
  ) {
    try {
      setLoading(true);
      const updates = {
        user_id: sessionID,
        age,
        username,
        gender,
        height,
        weight,
        activity,
        goal,
        updated_at: new Date(),
      };
      console.log(updates);
      const profile_data = await database.write(async () => {
        await database.get<Profile>("profiles").create((profile) => {
          profile.completeProfile(
            (profile.username = username),
            (profile.age = age),
            (profile.gender = gender),
            (profile.height = height),
            (profile.weight = weight),
            (profile.activity = activity),
            (profile.goal = goal)
          );
        });
      });
      if (profile_data) {
        console.log("Successfully created food post");
        const all_profiles = await database.get("profiles").query().fetch();
        console.log("food saved in DB!:", all_profiles);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  //Sign out of profile
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error updating email:", error.message);
    }
  };

  //Top Nav on Edit Profile Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerTintColor: colors.primary,
      headerLeft: () =>
        showEditProfile === false ? (
          <TouchableOpacity
            className="ml-5 mt-2"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Icon
              name="angle-left"
              style={{ color: colors.primary }}
              size={24}
            />
          </TouchableOpacity>
        ) : (
          <Button
            className="bg-primary ml-5"
            mode="elevated"
            onPress={() => {
              setEditProfile(false);
            }}
          >
            <Icon
              name="angle-left"
              style={{ color: colors.background }}
              size={20}
            />
          </Button>
        ),
    });
  }, [showEditProfile]);

  useEffect(() => {
    calAlgo(calParams, dispatch);
  }, [showActivityModal === false]);

  //Profile Screen
  const profile = () => {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="items-center my-8">
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../../assets/images/settings/Profile.png")}
          />
          <Text className="text-black my-2 text-lg">{name}NAME</Text>
          <Text className="text-gray-500 italic">{email}EMAIL</Text>
        </View>
        <View className="mx-8 mt-4">
          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Workout Plan</Text>
            <View className="ml-auto flex-row self-center">
              <MaterialCommunityIcons
                style={{ color: colors.primary }}
                name="pencil-outline"
                size={15}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Diet Plan</Text>
            <View className="ml-auto flex-row self-center">
              <MaterialCommunityIcons
                style={{ color: colors.primary }}
                name="pencil-outline"
                size={15}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{ borderColor: colors.secondary }}
            onPress={() => setShowWeightModal(true)}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Weight (kg)</Text>
            <Text className="ml-auto mr-2 opacity-60 text-xs">{weight} kg</Text>
            <MaterialCommunityIcons
              style={{ color: colors.primary }}
              name="pencil-outline"
              size={15}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ borderColor: colors.secondary }}
            onPress={() => setShowActivityModal(true)}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Activity Level</Text>
            <Text className="ml-auto mr-2 opacity-60 text-xs">{activity}</Text>
            <MaterialCommunityIcons
              style={{ color: colors.primary }}
              name="pencil-outline"
              size={15}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowGoalModal(true)}
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Weekly Goal:</Text>
            <Text className="ml-auto mr-2  opacity-60 text-xs">
              {goal} lb/s
            </Text>
            <MaterialCommunityIcons
              style={{ color: colors.primary }}
              name="pencil-outline"
              size={15}
            />
          </TouchableOpacity>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4"
          >
            <Text className="font-semibold">Daily Calorie Needs:</Text>
            <Text className="ml-auto opacity-60 text-xs">{dailyCal} cal</Text>
          </View>
        </View>
        {/* <Button
					onPress={signOut}
					style={{ backgroundColor: colors.primary }}
					className="w-40 mx-auto mt-4 "
					mode="contained">
					Sign Out
				</Button> */}

        {/* Modals */}
        <ActivityPickerModal
          showActivityModal={showActivityModal}
          setShowActivityModal={setShowActivityModal}
        />
        <WeightPickerModal
          showWeightModal={showWeightModal}
          setShowWeightModal={setShowWeightModal}
        />
        <WeeklyGoalModal
          showGoalModal={showGoalModal}
          setShowGoalModal={setShowGoalModal}
        />
      </View>
    );
  };

  return (
    <View className="flex-1">
      {showEditProfile === false ? profile() : <EditProfile />}
    </View>
  );
};

export default UserBioInput;

// await updateProfile(
//   newName,
//   newAge,
//   selectedGender,
//   Number(newHeight),
//   Number(newWeight),
//   selectedActivity,
//   Number(selectedGoal)
// );

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    borderRadius: 12,
    backgroundColor: "blue",
  },
  curvedLine: {
    width: "20%",
    height: 100,
    position: "absolute",
    bottom: -25,
    left: "40%",
    borderRadius: 35,
    backgroundColor: "black",
    transform: [{ scaleX: 5 }, { scaleY: 1 }],
  },
});
