import React, { useState } from "react";
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Text,
	TextInput,
	Keyboard,
	Alert,
	Modal,
} from "react-native";
import { Button, List, Surface } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../../database/models/Profile";

import { setUserStates } from "../../redux-manager/redux-slice/user-slice";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Picker } from "@react-native-picker/picker";

const EditProfile = () => {
	const database = useDatabase();
	const navigation = useNavigation();
	//Initiate user redux states
	const { sessionID, gender, weight, height, age, name, activity, goal } =
		useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Edit Profile Hooks
	const [newName, setName] = useState<string>(name);
	const [newHeight, setHeight] = useState<string>(height.toString());
	const [newWeight, setWeight] = useState<string>(weight.toString());
	const [newAge, setAge] = useState<number>(age);
	const [selectedGender, setGender] = useState<string>(gender);
	const [selectedActivity, setActivityLevel] = useState<string>(activity);
	const [selectedGoal, setGoal] = useState<string>(goal.toString());

	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	//Update Redux States
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

	//Watermelon update profile
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

	//Activity picker hooks
	const [selectActivityPicker, setSelectedActivityPicker] = useState("");
	const [showActivityPicker, setShowActivityPicker] = useState(false);

	//Activty picker modal
	const ActivityModal = () => {
		return (
			<Modal
				style={{ backgroundColor: "white" }}
				animationType="slide"
				visible={showActivityPicker}
				transparent>
				<View className="flex bg-primary mt-auto h-60">
					<Button onPress={() => setShowActivityPicker(false)}>Close</Button>
					<Picker
						style={{ color: "red" }}
						selectedValue={selectedActivity}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedActivityPicker(itemValue)
						}>
						<Picker.Item label="Sedentary" value="Sedentary" />
						<Picker.Item label="Active" value="Active" />
					</Picker>
				</View>
			</Modal>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className="flex-1 items-center justify-center bg-secondary">
				{/* Update Name */}
				<Surface className="mx-8 py-10 pb-12 bg-background rounded-3xl">
					<View className="flex-row mx-8 ">
						<TextInput
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newName}
							onChangeText={(newName) => setName(newName)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Username
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					{/* Update Age */}
					<View className="flex-row mx-8 ">
						<TextInput
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newAge.toString()}
							onChangeText={(newAge) => setAge(Number(newAge))}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">Age</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					{/* Update Height */}
					<View className="flex-row mx-8 ">
						<TextInput
							keyboardType="numeric"
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newHeight}
							onChangeText={(newHeight) => setHeight(newHeight)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Height (cm)
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					{/* Update Weight */}
					<View className="flex-row mx-8 ">
						<TextInput
							keyboardType="numeric"
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newWeight}
							onChangeText={(newWeight) => setWeight(newWeight)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Weight (kg)
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					{/* Update Activity */}
					<View className="flex-row mx-8 ">
						<TouchableOpacity
							onPress={() => {
								Keyboard.dismiss;
								setShowActivityPicker(true);
							}}
							className="flex-row text-primary border-solid border-b-2 w-full border-secondary py-4">
							<Text className="text-primary text-xs">{selectedActivity}</Text>
							<View className="ml-auto flex-row self-center">
								<Text className="text-xs mr-2 text-primary opacity-60">
									Activity
								</Text>
								<MaterialCommunityIcons
									name="pencil-outline"
									size={15}
									color={"#E07594"}
								/>
							</View>
						</TouchableOpacity>
					</View>

					{/* Weekly Goal */}
					<View className="flex-row mx-8 ">
						<TouchableOpacity
							onPress={Keyboard.dismiss}
							className="flex-row text-primary border-solid border-b-2 w-full border-secondary py-4">
							<Text className="text-primary text-xs">{selectedGoal}</Text>
							<View className="ml-auto flex-row self-center">
								<Text className="text-xs mr-2 text-primary opacity-60">
									Weight Loss (lbs)
								</Text>
								<MaterialCommunityIcons
									name="pencil-outline"
									size={15}
									color={"#E07594"}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</Surface>
				<Button
					className="mt-6 bg-primary w-40 mx-auto"
					onPress={async () => {
						await updateReduxProfileStates(
							newName,
							newAge,
							selectedGender,
							Number(newHeight),
							Number(newWeight),
							selectedActivity,
							Number(selectedGoal)
						);
						navigation.goBack();
					}}
					mode="contained">
					<Text className="text-white">Save</Text>
				</Button>
				{ActivityModal()}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default EditProfile;
