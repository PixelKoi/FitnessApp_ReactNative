import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, List } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	changeName,
	changeWeight,
	changeActivity,
	changeGoal,
	changeDailyCal,
	changeBMR,
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

	//Redux
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Edit profile hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [expandActivity, setExpandActivity] = useState<boolean>(false);
	const [expandGoal, setExpandGoal] = useState<boolean>(false);
	const [expandGender, setExpandGender] = useState<boolean>(false);
	const [name, setName] = useState<string>(userInfo.name);
	const [gender, setGender] = useState<string>(userInfo.gender);
	const [weight, setWeight] = useState<string>(userInfo.weight.toString());
	const [activityLevel, setActivityLevel] = useState<string>(userInfo.activity);
	const [goal, setGoal] = useState<string>(userInfo.goal);

	//Handle Accordian Dropdown
	const handleExpandGender = () => setExpandGender(!expandGender);
	const handleExpandActivity = () => setExpandActivity(!expandActivity);
	const handleExpandGoal = () => setExpandGoal(!expandGoal);

	//Update redux states
	async function handleEditProfile() {
		await dispatch(changeName(name));
		await dispatch(changeWeight(Number(weight)));
		await dispatch(changeActivity(activityLevel));
		await dispatch(changeGoal(goal));
		await calAlgo();
	}

	const calAlgo = () => {
		let calBMR = 0;

		if (userInfo.gender === "Male") {
			calBMR =
				88.3 +
				14.4 * userInfo.weight +
				4.8 * userInfo.height -
				5.7 * userInfo.age;
			console.log(calBMR);
		} else if (userInfo.gender === "Female") {
			calBMR =
				447.6 +
				9.2 * userInfo.weight +
				3.1 * userInfo.height -
				4.3 * userInfo.age;
		}

		switch (userInfo.activity) {
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
		console.log(calBMR);
		switch (userInfo.goal) {
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
							<Text className="ml-auto text-blue-600">{userInfo.name}</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Age:</Text>
							<Text className="ml-auto text-blue-600">{userInfo.age}</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Gender:</Text>
							<Text className="ml-auto text-blue-600">{userInfo.gender}</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Height (cm):</Text>
							<Text className="ml-auto text-blue-600">
								{userInfo.height} cm
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Weight (kg)</Text>
							<Text className="ml-auto text-blue-600">
								{userInfo.weight} kg
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Activity Level</Text>
							<Text className="ml-auto text-blue-600">{userInfo.activity}</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Weekly Goal:</Text>
							<Text className="ml-auto text-blue-600">
								{userInfo.goal} lb/s
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>Email:</Text>
							<Text className="ml-auto text-blue-600">@email.com</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2  border-gray-300 p-6">
							<Text>BMR:</Text>
							<Text className="ml-auto text-blue-600">{userInfo.bmr} cal</Text>
						</View>

						<View className="flex flex-row border-solid  p-6">
							<Text>Daily Calorie Needs:</Text>
							<Text className="ml-auto text-blue-600">
								{userInfo.dailyCal} cal
							</Text>
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
					value={name}
					onChangeText={(name) => setName(name)}
				/>
				<TextInput
					label="Enter Weight (kg)"
					value={weight}
					onChangeText={(weight) => setWeight(weight)}
				/>

				<List.Accordion
					title={gender}
					left={(props) => <List.Icon {...props} icon="face" />}
					expanded={expandGender}
					onPress={handleExpandGender}>
					<List.Item
						style={{
							backgroundColor: gender === "Female" ? "red" : "none",
						}}
						onPress={() => {
							setGender("Female");
							setExpandGender((prevClick) => !prevClick);
						}}
						title="Female"
					/>
					<List.Item
						style={{
							backgroundColor: gender === "Male" ? "red" : "none",
						}}
						onPress={() => {
							setGender("Male");
							setExpandGender((prevClick) => !prevClick);
						}}
						title="Male"
					/>
				</List.Accordion>

				<List.Accordion
					title={activityLevel}
					description="Select activity level"
					left={(props) => <List.Icon {...props} icon="run" />}
					expanded={expandActivity}
					onPress={handleExpandActivity}>
					<List.Item
						style={{
							backgroundColor: activityLevel === "Sedentary" ? "red" : "none",
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
								activityLevel === "Lightly active" ? "red" : "none",
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
								activityLevel === "Moderately active" ? "red" : "none",
						}}
						onPress={() => {
							setActivityLevel("Moderately active");
							setExpandActivity((prevClick) => !prevClick);
						}}
						title="Moderately active"
					/>
					<List.Item
						style={{
							backgroundColor: activityLevel === "Very active" ? "red" : "none",
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
								activityLevel === "Extremely active" ? "red" : "none",
						}}
						onPress={() => {
							setActivityLevel("Extremely active");
							setExpandActivity((prevClick) => !prevClick);
						}}
						title="Extremely active"
					/>
				</List.Accordion>

				<List.Accordion
					title={goal + "lbs"}
					description="Select Weight Loss Goal"
					left={(props) => <List.Icon {...props} icon="scale" />}
					expanded={expandGoal}
					onPress={handleExpandGoal}>
					<List.Item
						style={{
							backgroundColor: goal === "1" ? "red" : "none",
						}}
						onPress={() => {
							setGoal("1");
							setExpandGoal((prevClick) => !prevClick);
						}}
						title="1lb / week"
					/>
					<List.Item
						style={{
							backgroundColor: goal === "2" ? "red" : "none",
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
