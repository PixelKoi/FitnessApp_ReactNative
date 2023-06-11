import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	StatusBar,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	TextInput,
	Button,
	List,
	Surface,
	Pressable,
	Modal,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "../../database/models/Profile";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import calAlgo from "./cal-algo";
import { UserCircleIcon } from "react-native-heroicons/outline";
import EditProfile from "./EditProfile";

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
			title: "Profile",
			headerStyle: {
				backgroundColor: "#E07594",
				shadowColor: "transparent",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerRight: () =>
				showEditProfile === false && (
					<View>
						<Button
							className="mr-14 bg-white"
							onPress={() => setEditProfile(true)}>
							Edit
						</Button>
					</View>
				),
			headerLeft: () =>
				showEditProfile === false ? (
					<Button
						className="bg-primary ml-5"
						mode="elevated"
						onPress={() => {
							navigation.navigate("Dashboard");
						}}>
						<Icon name="angle-left" style={{ color: "#ffff" }} size={20} />
					</Button>
				) : (
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
				<View className="flex bg-primary items-center  pb-6 w-full rounded-b-full absolute z-10">
					<UserCircleIcon name="ios-add" size={50} color={"white"} />
					<Text className="text-white my-2">{name}</Text>
					<Text className="text-white">@gmail.com</Text>
				</View>
				<Surface className="mx-8 py-8 pb-12 mt-24 rounded-b-3xl bg-background">
					<View className="mx-8">
						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Age:</Text>
							<Text className="ml-auto text-primary opacity-60  text-xs">
								{age}
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary  text-xs">Gender:</Text>
							<Text className="ml-auto text-primary opacity-60  text-xs">
								{gender}
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Height (cm):</Text>
							<Text className="ml-auto text-primary opacity-60 text-xs">
								{height} cm
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
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

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Weekly Goal:</Text>
							<Text className="ml-auto text-primary opacity-60 text-xs">
								{goal} lb/s
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Email:</Text>
							<Text className="ml-auto text-primary opacity-60 text-xs">
								@email.com
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">BMR:</Text>
							<Text className="ml-auto text-primary opacity-60 text-xs">
								{bmr} cal
							</Text>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
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

	return (
		<View className="flex-1 bg-secondary">
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
	container: {},
});
