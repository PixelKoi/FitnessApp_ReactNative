import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, List } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	changeDailyCal,
	changeBMR,
	setUserStates,
} from "../../features/user/user-slice";

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
const UserBioInput = () => {
	//Navigation
	const navigation = useNavigation();

	//Initiate User-Slice Redux
	const { gender, weight, height, age, name, activity, goal, bmr, dailyCal } =
		useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Edit profile hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [newName, setName] = useState<string>(name);
	const [newHeight, setHeight] = useState<string>(height.toString());
	const [newWeight, setWeight] = useState<string>(weight.toString());
	const [selectedGender, setGender] = useState<string>(gender);
	const [selectedActivity, setActivityLevel] = useState<string>(activity);
	const [selectedGoal, setGoal] = useState<string>(goal);

	//Handle Accordian Dropdown Lists
	const [expandActivity, setExpandActivity] = useState<boolean>(false);
	const [expandGoal, setExpandGoal] = useState<boolean>(false);
	const [expandGender, setExpandGender] = useState<boolean>(false);
	const handleExpandGender = () => setExpandGender(!expandGender);
	const handleExpandActivity = () => setExpandActivity(!expandActivity);
	const handleExpandGoal = () => setExpandGoal(!expandGoal);

	//Update redux states
	async function handleEditProfile() {
		await dispatch(
			setUserStates({
				name: newName,
				height: newHeight,
				weight: newWeight,
				activity: selectedActivity,
				goal: selectedGoal,
			})
		);
		await calAlgo();
	}

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
			case "1":
				dispatch(changeDailyCal(Math.round(calBMR - 500)));
				break;
			case "2":
				dispatch(changeDailyCal(Math.round(calBMR - 1000)));
				break;
			default:
				dispatch(changeDailyCal(Math.round(calBMR)));
				break;
		}

		dispatch(changeBMR(Math.round(calBMR)));
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
						}}>
						<Text className="ml-4">back</Text>
					</TouchableOpacity>
				),
		});
	}, [showEditProfile]);

	useEffect(() => {
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
					mode="contained">
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
					onPress={handleExpandGender}>
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
					onPress={handleExpandActivity}>
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
					onPress={handleExpandGoal}>
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
						await handleEditProfile();
						setEditProfile(false);
					}}
					mode="contained">
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
