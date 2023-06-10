import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	StatusBar,
	SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, List, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { setUserStates } from "../../redux-manager/redux-slice/user-slice";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../../database/models/Profile";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import calAlgo from "./cal-algo";
import { UserCircleIcon } from "react-native-heroicons/outline";

const UserBioInput = () => {
	const database = useDatabase();
	const navigation = useNavigation();

	//Initiate user redux states
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

	//Create Calorie Param object for calAlgo function
	const calParams = {
		age: age,
		gender: gender,
		weight: weight,
		height: height,
		activity: activity,
		goal: goal,
	};

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
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

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
						}}>
						<Text className="ml-4">back</Text>
					</TouchableOpacity>
				),
		});
	}, [showEditProfile]);

	useEffect(() => {
		calAlgo(calParams, dispatch);
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
				<TouchableOpacity
					onPress={() => setShowPicker((prevClick) => !prevClick)}
					className="py-3 px-4 flex-row">
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
						await updateProfile(
							newName,
							newAge,
							selectedGender,
							Number(newHeight),
							Number(newWeight),
							selectedActivity,
							Number(selectedGoal)
						);

						// await updateReduxProfileStates(
						// 	newName,
						// 	newAge,
						// 	selectedGender,
						// 	Number(newHeight),
						// 	Number(newWeight),
						// 	selectedActivity,
						// 	Number(selectedGoal)
						// );
						setEditProfile(false);
					}}
					mode="contained">
					<Text className="text-black">Save</Text>
				</Button>
			</View>
		);
	};

	return (
		<View className="flex-1 bg-secondary">
			{/* {showEditProfile === false ? profile() : editProfile()} */}
			<View className="flex bg-primary items-center pb-8 w-full rounded-b-full absolute z-10">
				<UserCircleIcon
					name="ios-add"
					size={50}
					color={"white"}
					className="text-center"
				/>
				<Text className="text-white">{name}</Text>
				<Text className="text-white">@gmail.com</Text>
			</View>
			<Surface className="mx-8 py-8 pb-12 mt-24 rounded-b-3xl">
				<View className="mx-8">
					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Age:</Text>
						<Text className="ml-auto text-primary opacity-60  text-xs">
							{age}
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary  text-xs">Gender:</Text>
						<Text className="ml-auto text-primary opacity-60  text-xs">
							{gender}
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Height (cm):</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{height} cm
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Weight (kg)</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{weight} kg
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
						<Text className="text-primary text-xs">Activity Level</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{activity}
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Weekly Goal:</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{goal} lb/s
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Email:</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							@email.com
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">BMR:</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{bmr} cal
						</Text>
					</View>

					<View className="flex flex-row border-solid border-b-2 py-3 border-secondary">
						<Text className="text-primary text-xs">Daily Calorie Needs:</Text>
						<Text className="ml-auto text-primary opacity-60 text-xs">
							{dailyCal} cal
						</Text>
					</View>
				</View>
			</Surface>
		</View>
	);
};

export default UserBioInput;
