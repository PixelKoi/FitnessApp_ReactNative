import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
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
				backgroundColor:
					showEditProfile === false ? colors.primary : colors.secondary,
				shadowColor: "transparent",
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerTintColor:
				showEditProfile === false ? colors.secondary : colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerShadowVisible: false,
			headerBackTitleVisible: false,
			headerRight: () =>
				showEditProfile === false && (
					<View>
						<Button
							style={{ backgroundColor: colors.background }}
							className="mr-8"
							onPress={() => setEditProfile(true)}>
							<Text style={{ color: colors.primary }}>Edit</Text>
						</Button>
					</View>
				),
			headerLeft: () =>
				showEditProfile === false ? (
					<Button
						style={{ backgroundColor: colors.primary }}
						className="ml-5"
						mode="elevated"
						onPress={() => {
							navigation.navigate("History");
						}}>
						<Icon
							name="angle-left"
							style={{ color: colors.background }}
							size={20}
						/>
					</Button>
				) : (
					<Button
						className="bg-primary ml-5"
						mode="elevated"
						onPress={() => {
							setEditProfile(false);
						}}>
						<Icon
							name="angle-left"
							style={{ color: colors.background }}
							size={20}
						/>
					</Button>
				),
		});
	}, [showEditProfile]);

	const [showActivityModal, setShowActivityModal] = useState(false);

	useEffect(() => {
		calAlgo(calParams, dispatch);
	}, [showActivityModal === false]);

	//Profile Screen
	const profile = () => {
		return (
			<View className="flex-1 ">
				<View
					style={{ backgroundColor: colors.primary }}
					className="flex items-center  pb-6 w-full rounded-b-full absolute z-10">
					<UserCircleIcon name="ios-add" size={50} color={"white"} />
					<Text className="text-white my-2">{name}</Text>
					<Text className="text-white">{email}</Text>
				</View>
				<Surface
					style={{ backgroundColor: colors.background }}
					className="mx-8 py-8 pb-12 mt-24 rounded-b-3xl">
					<View className="mx-8">
						<View
							style={{ borderColor: colors.secondary }}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Workout Plan
							</Text>
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
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Diet Plan
							</Text>
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
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Theme
							</Text>

							<Text
								style={{ color: colors.primary }}
								className="ml-auto mr-2 opacity-60 text-xs">
								Bubble Gum
							</Text>
							<MaterialCommunityIcons
								style={{ color: colors.primary }}
								name="pencil-outline"
								size={15}
							/>
						</View>

						<View
							style={{ borderColor: colors.secondary }}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Weight (kg)
							</Text>
							<Text
								style={{ color: colors.primary }}
								className="ml-auto mr-2 opacity-60 text-xs">
								{weight} kg
							</Text>
							<MaterialCommunityIcons
								style={{ color: colors.primary }}
								name="pencil-outline"
								size={15}
							/>
						</View>

						<TouchableOpacity
							style={{ borderColor: colors.secondary }}
							onPress={() => setShowActivityModal(true)}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Activity Level
							</Text>
							<Text
								style={{ color: colors.primary }}
								className="ml-auto mr-2 opacity-60 text-xs">
								{activity}
							</Text>
							<MaterialCommunityIcons
								style={{ color: colors.primary }}
								name="pencil-outline"
								size={15}
							/>
						</TouchableOpacity>

						<View
							style={{ borderColor: colors.secondary }}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Weekly Goal:
							</Text>
							<Text
								style={{ color: colors.primary }}
								className="ml-auto mr-2  opacity-60 text-xs">
								{goal} lb/s
							</Text>
							<MaterialCommunityIcons
								style={{ color: colors.primary }}
								name="pencil-outline"
								size={15}
							/>
						</View>

						<View
							style={{ borderColor: colors.secondary }}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								BMR:
							</Text>
							<Text
								style={{ color: colors.primary }}
								className="ml-auto opacity-60 text-xs">
								{bmr} cal
							</Text>
						</View>

						<View
							style={{ borderColor: colors.secondary }}
							className="flex flex-row border-solid border-b-2 py-4">
							<Text style={{ color: colors.primary }} className="text-xs">
								Daily Calorie Needs:
							</Text>
							<Text
								style={{ color: colors.primary }}
								className="ml-auto opacity-60 text-xs">
								{dailyCal} cal
							</Text>
						</View>
					</View>
				</Surface>
				<Button
					onPress={signOut}
					style={{ backgroundColor: colors.primary }}
					className="w-40 mx-auto mt-4 "
					mode="contained">
					Sign Out
				</Button>

				<ActivityPickerModal
					showActivityModal={showActivityModal}
					setShowActivityModal={setShowActivityModal}
				/>
			</View>
		);
	};

	return (
		<View style={{ backgroundColor: colors.secondary }} className="flex-1">
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
