import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
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
	const dispatch = useAppDispatch();

	//Edit Profile Hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);

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
			title: showEditProfile === false ? "Quick Settings" : "Edit Profile",
			headerStyle: {
				backgroundColor: showEditProfile === false ? "#E07594" : "#F6E6EB",
				shadowColor: "transparent",
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerTintColor: showEditProfile === false ? "#fff" : "#E07594",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerShadowVisible: false,
			headerBackTitleVisible: false,
			headerRight: () =>
				showEditProfile === false && (
					<View>
						<Button
							className="mr-8 bg-white"
							onPress={() => setEditProfile(true)}>
							<Text className="text-primary">Edit</Text>
						</Button>
					</View>
				),
			headerLeft: () =>
				showEditProfile === false ? (
					<Button
						className="bg-primary ml-5"
						mode="elevated"
						onPress={() => {
							navigation.navigate("History");
						}}>
						<Icon name="angle-left" style={{ color: "#ffff" }} size={20} />
					</Button>
				) : (
					<Button
						className="bg-primary ml-5"
						mode="elevated"
						onPress={() => {
							setEditProfile(false);
						}}>
						<Icon name="angle-left" style={{ color: "#ffff" }} size={20} />
					</Button>
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
					<Text className="text-white">{email}</Text>
				</View>
				<Surface className="mx-8 py-8 pb-12 mt-24 rounded-b-3xl bg-background">
					<View className="mx-8">
						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Workout Plan</Text>
							<View className="ml-auto flex-row self-center">
								<MaterialCommunityIcons
									name="pencil-outline"
									size={15}
									color={"#E07594"}
								/>
							</View>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Diet Plan</Text>
							<View className="ml-auto flex-row self-center">
								<MaterialCommunityIcons
									name="pencil-outline"
									size={15}
									color={"#E07594"}
								/>
							</View>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Theme</Text>

							<Text className="ml-auto mr-2 text-primary opacity-60 text-xs">
								Bubble Gum
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Weight (kg)</Text>
							<Text className="ml-auto mr-2 text-primary opacity-60 text-xs">
								{weight} kg
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Activity Level</Text>
							<Text className="ml-auto mr-2 text-primary opacity-60 text-xs">
								{activity}
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>

						<View className="flex flex-row border-solid border-b-2 py-4 border-secondary">
							<Text className="text-primary text-xs">Weekly Goal:</Text>
							<Text className="ml-auto mr-2 text-primary opacity-60 text-xs">
								{goal} lb/s
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
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
				<Button
					onPress={signOut}
					className="w-40 mx-auto mt-4 bg-primary"
					mode="contained">
					Sign Out
				</Button>
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
