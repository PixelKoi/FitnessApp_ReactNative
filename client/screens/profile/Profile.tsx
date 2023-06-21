import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Switch,
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
import EditProfile from "./EditProfile";
import { supabase } from "../../utils/supabase_authentication/supabase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ActivityPickerModal from "./modals/ActivityPickerModal";
import WeightPickerModal from "./modals/WeightPickerModal";
import WeeklyGoalModal from "./modals/WeeklyGoalModal";

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

  // Toggle switch push notifications
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const notificationsToggleSwitch = () =>
    setIsPushEnabled((previousState) => !previousState);

  // Toggle switch Dark Mode
  const [isDarkEnabled, setIsDarkEnabled] = useState(false);
  const darkToggleSwitch = () =>
    setIsDarkEnabled((previousState) => !previousState);

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
              navigation.navigate("History");
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
        <View className="items-center my-8 flex-row mx-8 justify-center">
          <UserCircleIcon name="ios-add" size={85} color={"black"} />
          <View className=" flex flex-col ml-6">
            <Text className="text-black my-2">{name}Gerrard Nazarian</Text>
            <Text className="text-gray-500 italic">
              {email}garonazarian09@gmail.com
            </Text>
          </View>
          <View className="flex ml-7 mb-5">
            <Icon
              size={18}
              style={{ color: colors.primary }}
              name="external-link"
            ></Icon>
          </View>
        </View>
        <View className="flex flex-row pl-8">
          <Text className="text-gray-400">Settings</Text>
        </View>
        <View className="mx-8 mt-4">
          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />

            <Text className="text-lg font-semibold pl-5">Avatar</Text>
            <View className="ml-auto flex-row self-center">
              <Icon
                style={{ color: colors.primary }}
                name="chevron-right"
                size={14}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />
            <Text className="text-lg font-semibold pl-5">Theme</Text>
            <View className="ml-auto flex-row self-center">
              <Icon
                style={{ color: colors.primary }}
                name="chevron-right"
                size={14}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />
            <Text className="text-lg font-semibold pl-5">
              Push Notification
            </Text>
            <View className="ml-auto flex-row self-center">
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isPushEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={notificationsToggleSwitch}
                value={isPushEnabled}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />
            <Text className="text-lg font-semibold pl-5">Dark Mode</Text>
            <View className="ml-auto flex-row self-center">
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={darkToggleSwitch}
                value={isDarkEnabled}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />
            <Text className="text-lg font-semibold pl-5">
              Sharing and Privary
            </Text>
            <View className="ml-auto flex-row self-center">
              <Icon
                style={{ color: colors.primary }}
                name="chevron-right"
                size={14}
              />
            </View>
          </View>

          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <UserCircleIcon name="ios-add" size={36} color={"black"} />
            <Text className="text-lg font-semibold pl-5">
              Go Premium Section
            </Text>
            <View className="ml-auto flex-row self-center">
              <Icon
                style={{ color: colors.primary }}
                name="chevron-right"
                size={14}
              />
            </View>
          </View>
          <View
            style={{ borderColor: colors.secondary }}
            className="flex flex-row border-solid border-b-2 py-4 items-center"
          >
            <Text
              style={{ color: colors.primary }}
              className="text-lg font-extrabold items-center justify-center "
            >
              Logout
            </Text>
            <View className="ml-auto flex-row self-center">
              <Icon
                style={{ color: colors.primary }}
                name="chevron-right"
                size={14}
              />
            </View>
          </View>
        </View>

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
