import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, List } from "react-native-paper";
import { supabase } from "../../utils/supabase_authentication/supabase";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
  changeDailyCal,
  changeBMR,
  setUserStates,
} from "../../redux-manager/redux-slice/user-slice";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../../database/models/Profile";
import { useDatabase } from "@nozbe/watermelondb/hooks";

const UserBioInput = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const {
    sessionID,
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
  const dispatch = useAppDispatch();

  //Edit Profile Hooks
  const [showEditProfile, setEditProfile] = useState<boolean>(false);
  const [newName, setName] = useState<string>(name);
  const [newHeight, setHeight] = useState<string>(height.toString());
  const [newWeight, setWeight] = useState<string>(weight.toString());
  const [newAge, setAge] = useState<number>(age);
  const [selectedGender, setGender] = useState<string>(gender);
  const [selectedActivity, setActivityLevel] = useState<string>(activity);
  const [selectedGoal, setGoal] = useState<string>(goal.toString());

  //Accordian Dropdown Lists Hooks
  const [expandActivity, setExpandActivity] = useState<boolean>(false);
  const [expandGoal, setExpandGoal] = useState<boolean>(false);
  const [expandGender, setExpandGender] = useState<boolean>(false);
  const handleExpandGender = () => setExpandGender(!expandGender);
  const handleExpandActivity = () => setExpandActivity(!expandActivity);
  const handleExpandGoal = () => setExpandGoal(!expandGoal);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  //Update redux states
  async function updateReduxProfileStates(
    username: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    activity: string,
    goal: number
  ) {
    await dispatch(
      setUserStates({
        name: username,
        age: age,
        gender: gender,
        height: Number(height),
        weight: Number(weight),
        activity: activity,
        goal: Number(goal),
      })
    );
    await calAlgo();
  }

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
      // let { error } = await supabase.from("profile").upsert(updates);
      // if (!error) {
      //   await updateReduxProfileStates(
      //     username,
      //     age,
      //     gender,
      //     height,
      //     weight,
      //     activity,
      //     goal
      //   );
      // }
      //
      // if (error) {
      //   throw error;
      // }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  /*
		Calorie Counting Algorithm

		For men: BMR = 88.36 + (13.4 x weight in kg) + (4.8 x height in cm) - (5.7 x age in years)
		For women: BMR = 447.6 + (9.2 x weight in kg) + (3.1 x height in cm) - (4.3 x age in years)

		Sedentary (little or no exercise): TDEE = BMR x 1.2
		Lightly active (light exercise or sports 1-3 days/week): TDEE = BMR x 1.375
		Moderately active (moderate exercise or sports 3-5 days/week): TDEE = BMR x 1.55
		Very active (hard exercise or sports 6-7 days/week): TDEE = BMR x 1.725
		Extremely active (very hard exercise or sports, physical job or training twice a day): TDEE = BMR x 1.9

		Lose 1lb a week = -500 cal deficit
	*/
  const calAlgo = () => {
    let calBMR = 0;

    if (gender === "Male") {
      calBMR = 88.3 + 14.4 * weight + 4.8 * height - 5.7 * age;
    } else if (gender === "Female") {
      calBMR = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    }

    switch (activity) {
      case "Sedentary":
        calBMR *= 1.2;
        break;
      case "Lightly active":
        calBMR *= 1.375;
        break;
      case "Moderately active":
        calBMR *= 1.55;
        break;
      case "Very active":
        calBMR *= 1.725;
        break;
      case "Extremely active":
        calBMR *= 1.9;
        break;
      default:
        break;
    }

    switch (goal) {
      case 1:
        dispatch(changeDailyCal(Math.round(calBMR - 500)));
        break;
      case 2:
        dispatch(changeDailyCal(Math.round(calBMR - 1000)));
        break;
      default:
        dispatch(changeDailyCal(Math.round(calBMR)));
        break;
    }

    dispatch(changeBMR(Math.round(calBMR)));
  };

  //Get Age after selecting date from time picker
  function getAgeFromDateOfBirth(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  //Get date from time picker
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
      setAge(getAgeFromDateOfBirth(date));
    }
  };

  //Top Nav on Edit Profile Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: showEditProfile === false ? "Profile" : "Edit Profile",
      headerLeft: () =>
        showEditProfile === false ? null : (
          <TouchableOpacity
            onPress={() => {
              setEditProfile(false);
            }}
          >
            <Text className="ml-4">back</Text>
          </TouchableOpacity>
        ),
    });
  }, [showEditProfile]);

  useEffect(() => {
    console.log(sessionID);
    calAlgo();
  }, [showEditProfile === false]);

  //Profile Screen
  const profile = () => {
    return (
      <View className="flex-1 ">
        <View className="">
          <View className="flex  ">
            <View className="flex flex-row border-solid border-y-2 m-0 border-gray-300 p-6">
              <Text>User Name:</Text>
              <Text className="ml-auto text-blue-600">{name}</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Age:</Text>
              <Text className="ml-auto text-blue-600">{age}</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Gender:</Text>
              <Text className="ml-auto text-blue-600">{gender}</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Height (cm):</Text>
              <Text className="ml-auto text-blue-600">{height} cm</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Weight (kg)</Text>
              <Text className="ml-auto text-blue-600">{weight} kg</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Activity Level</Text>
              <Text className="ml-auto text-blue-600">{activity}</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Weekly Goal:</Text>
              <Text className="ml-auto text-blue-600">{goal} lb/s</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>Email:</Text>
              <Text className="ml-auto text-blue-600">@email.com</Text>
            </View>

            <View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
              <Text>BMR:</Text>
              <Text className="ml-auto text-blue-600">{bmr} cal</Text>
            </View>

            <View className="flex flex-row border-solid  p-6">
              <Text>Daily Calorie Needs:</Text>
              <Text className="ml-auto text-blue-600">{dailyCal} cal</Text>
            </View>
          </View>
        </View>
        <Button
          className="p-4 rounded-none rounded-t-2xl mt-auto"
          style={{ backgroundColor: "#84d0ff" }}
          onPress={() => setEditProfile(true)}
          mode="contained"
        >
          <Text className="text-black">Edit Profile</Text>
        </Button>
      </View>
    );
  };

  //Edit Profile Screen
  const editProfile = () => {
    return (
      <View>
        <TextInput
          label="User Name"
          value={newName}
          onChangeText={(newName) => setName(newName)}
        />
        <TouchableOpacity
          onPress={() => setShowPicker((prevClick) => !prevClick)}
          className="py-3 px-4 flex-row"
        >
          <View>
            <Text>Age</Text>
            <Text className="mt-2">{newAge}</Text>
          </View>
          <View className="ml-auto my-auto">
            <Icon
              name={showPicker === true ? "minus" : "plus"}
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            mode="date"
            display="spinner"
          />
        )}
        <TextInput
          label="Enter Height (cm)"
          value={newHeight}
          onChangeText={(newHeight) => setHeight(newHeight)}
        />
        <TextInput
          label="Enter Weight (kg)"
          value={newWeight}
          onChangeText={(newWeight) => setWeight(newWeight)}
        />

        <List.Accordion
          title={selectedGender}
          left={(props) => <List.Icon {...props} icon="run" />}
          expanded={expandGender}
          onPress={handleExpandGender}
        >
          <List.Item
            style={{
              backgroundColor: selectedGender === "Female" ? "red" : "none",
            }}
            onPress={() => {
              setGender("Female");
              setExpandGender((prevClick) => !prevClick);
            }}
            title="Female"
          />
          <List.Item
            style={{
              backgroundColor: selectedGender === "Male" ? "red" : "none",
            }}
            onPress={() => {
              setGender("Male");
              setExpandGender((prevClick) => !prevClick);
            }}
            title="Male"
          />
        </List.Accordion>

        <List.Accordion
          title={selectedActivity}
          description="Select activity level"
          left={(props) => <List.Icon {...props} icon="run" />}
          expanded={expandActivity}
          onPress={handleExpandActivity}
        >
          <List.Item
            style={{
              backgroundColor:
                selectedActivity === "Sedentary" ? "red" : "none",
            }}
            onPress={() => {
              setActivityLevel("Sedentary");
              setExpandActivity((prevClick) => !prevClick);
            }}
            title="Sedentary"
          />
          <List.Item
            style={{
              backgroundColor:
                selectedActivity === "Lightly active" ? "red" : "none",
            }}
            onPress={() => {
              setActivityLevel("Lightly active");
              setExpandActivity((prevClick) => !prevClick);
            }}
            title="Lightly active"
          />
          <List.Item
            style={{
              backgroundColor:
                selectedActivity === "Moderately active" ? "red" : "none",
            }}
            onPress={() => {
              setActivityLevel("Moderately active");
              setExpandActivity((prevClick) => !prevClick);
            }}
            title="Moderately active"
          />
          <List.Item
            style={{
              backgroundColor:
                selectedActivity === "Very active" ? "red" : "none",
            }}
            onPress={() => {
              setActivityLevel("Very active");
              setExpandActivity((prevClick) => !prevClick);
            }}
            title="Very active"
          />
          <List.Item
            style={{
              backgroundColor:
                selectedActivity === "Extremely active" ? "red" : "none",
            }}
            onPress={() => {
              setActivityLevel("Extremely active");
              setExpandActivity((prevClick) => !prevClick);
            }}
            title="Extremely active"
          />
        </List.Accordion>

        <List.Accordion
          title={selectedGoal + "lbs"}
          description="Select Weight Loss Goal"
          left={(props) => <List.Icon {...props} icon="scale" />}
          expanded={expandGoal}
          onPress={handleExpandGoal}
        >
          <List.Item
            style={{
              backgroundColor: selectedGoal === "1" ? "red" : "none",
            }}
            onPress={() => {
              setGoal("1");
              setExpandGoal((prevClick) => !prevClick);
            }}
            title="1lb / week"
          />
          <List.Item
            style={{
              backgroundColor: selectedGoal === "2" ? "red" : "none",
            }}
            onPress={() => {
              setGoal("2");
              setExpandGoal((prevClick) => !prevClick);
            }}
            title="2lbs / week"
          />
        </List.Accordion>

        <Button
          className="mt-6 py-1 mx-4"
          style={{ backgroundColor: "#84d0ff" }}
          onPress={async () => {
            await updateProfile(
              newName,
              newAge,
              selectedGender,
              Number(newHeight),
              Number(newWeight),
              selectedActivity,
              Number(selectedGoal)
            );
            setEditProfile(false);
          }}
          mode="contained"
        >
          <Text className="text-black">Save</Text>
        </Button>
      </View>
    );
  };

  return (
    <View className="flex-1">
      {showEditProfile === false ? profile() : editProfile()}
    </View>
  );
};

export default UserBioInput;
