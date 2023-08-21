import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux-manager/hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "../../utils/supabase_authentication/supabase";
//SQLite
import { createProfileSQLite } from "../../utils/SQLite/profiles-table";
import { showAllFastingRecordsSQLite } from "../../utils/SQLite/fasting-table";
const Settings = () => {
	const navigation = useNavigation();

	//Initiate user redux states
	const { email, username, age, gender, height, weight, activity, goal } =
		useAppSelector((state) => state.user);
	const { colors } = useAppSelector((state) => state.theme);

	//Edit Profile Hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);

	// Toggle switch push notifications
	const [isPushEnabled, setIsPushEnabled] = useState(false);
	const notificationsToggleSwitch = () =>
		setIsPushEnabled((previousState) => !previousState);

	// Toggle switch Dark Mode
	const [isDarkEnabled, setIsDarkEnabled] = useState(false);
	const darkToggleSwitch = () =>
		setIsDarkEnabled((previousState) => !previousState);

	//Sign out of Settings
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

	const profileData = {
		username,
		email,
		age,
		gender,
		height,
		weight,
		activity,
		goal,
	};

	//Top Nav on Edit Profile Screen
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Settings",
			headerTintColor: "black",
			headerLeft: () => (
				<TouchableOpacity
					className=""
					onPress={() => {
						navigation.navigate("Dashboard");
					}}>
					<Icon name="angle-left" style={{ color: "black" }} size={30} />
				</TouchableOpacity>
			),
		});
	}, [showEditProfile]);

	return (
		<View className="flex-1" style={{ backgroundColor: colors.background }}>
			<View className="mx-4">
				<View className="items-center my-8 flex-row  justify-center">
					<Image
						style={{ width: 90, height: 90 }}
						source={require("../../assets/images/settings/Profile.png")}
					/>
					<View className=" flex flex-col ml-6">
						<Text className="text-black my-2 font-bold text-lg">
							{username}
						</Text>
						<Text className="text-gray-500 italic">{email}</Text>
					</View>
					<View className="flex ml-7 mb-5">
						<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
							<Icon
								size={18}
								style={{ color: "black" }}
								name="external-link"></Icon>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/Avatar.png")}
						/>
						<Text className="text-sm  font-semibold pl-5">Avatar</Text>
						<View className="ml-auto flex-row self-center">
							<Icon style={{ color: "black" }} name="chevron-right" size={14} />
						</View>
					</View>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Theme");
						}}
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/Theme.png")}
						/>
						<Text className="text-sm  font-semibold pl-5">Theme</Text>
						<View className="ml-auto flex-row self-center">
							<Icon style={{ color: "black" }} name="chevron-right" size={14} />
						</View>
					</TouchableOpacity>

					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/Push.png")}
						/>
						<Text className="text-sm  font-semibold pl-5">
							Push Notification
						</Text>
						<View className="ml-auto flex-row self-center">
							<Switch
								trackColor={{ false: "#767577", true: "#81b0ff" }}
								thumbColor={isPushEnabled ? "#f5dd4b" : "#f4f3f4"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={notificationsToggleSwitch}
								value={isPushEnabled}
								style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
							/>
						</View>
					</View>

					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/DarkMode.png")}
						/>
						<Text className="text-sm  font-semibold pl-5">Dark Mode</Text>
						<View className="ml-auto flex-row self-center">
							<Switch
								trackColor={{ false: "#767577", true: "#81b0ff" }}
								thumbColor={isDarkEnabled ? "#f5dd4b" : "#f4f3f4"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={darkToggleSwitch}
								value={isDarkEnabled}
								style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
							/>
						</View>
					</View>

					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/Sharing.png")}
						/>
						<Text className="text-sm  font-semibold pl-5">
							Sharing and Privary
						</Text>
						<View className="ml-auto flex-row self-center">
							<Icon style={{ color: "black" }} name="chevron-right" size={14} />
						</View>
					</View>

					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid border-b-2 py-3 items-center">
						<Image
							style={{ width: 42, height: 42 }}
							source={require("../../assets/images/settings/Premium.png")}
						/>
						<Text className="text-sm font-semibold pl-5">
							Go Premium Section
						</Text>
						<View className="ml-auto flex-row self-center">
							<Icon style={{ color: "black" }} name="chevron-right" size={14} />
						</View>
					</View>
					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid py-4 items-center">
						<TouchableOpacity onPress={signOut} className="flex flex-col">
							<Text className="text-gray-400 text-base ">My account</Text>
							<Text
								style={{ color: "#F65050" }}
								className="text-base  font-extrabold items-center justify-center ">
								Logout
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{ borderColor: colors.secondary }}
						className="flex flex-row border-solid py-4 items-center">
						<TouchableOpacity
							onPress={() => {
								createProfileSQLite(profileData), showAllFastingRecordsSQLite();
							}}
							className="flex flex-col">
							<Text
								style={{ color: "#F65050" }}
								className="text-base  font-extrabold items-center justify-center ">
								Update Profile Test
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Settings;
