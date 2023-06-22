import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	StyleSheet,
	Switch,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { supabase } from "../../utils/supabase_authentication/supabase";
import SignUpModal from "../../utils/settings/profile/modals/modals/SignUpModal";
import SignInModal from "../../utils/settings/profile/modals/modals/SignInModal";
import GenderModal from "../../utils/settings/profile/modals/modals/GenderModal";

const Settings = () => {
	const database = useDatabase();
	const navigation = useNavigation();

	//Initiate user redux states
	const { email, name } = useAppSelector((state) => state.user);
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//Edit Profile Hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [showActivityModal, setShowActivityModal] = useState(false);

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

	//Top Nav on Edit Profile Screen
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Settings",
			headerTintColor: colors.primary,
			headerLeft: () => (
				<TouchableOpacity
					className="ml-5 mt-2"
					onPress={() => {
						navigation.navigate("Dashboard");
					}}>
					<Icon name="angle-left" style={{ color: colors.primary }} size={24} />
				</TouchableOpacity>
			),
		});
	}, [showEditProfile]);

	return (
		<View className="flex-1" style={{ backgroundColor: colors.background }}>
			<View className="items-center my-8 flex-row mx-8 justify-center">
				<Image
					style={{ width: 90, height: 90 }}
					source={require("../../assets/images/settings/Profile.png")}
				/>
				<View className=" flex flex-col ml-6">
					<Text className="text-black my-2 font-bold text-lg">{name}</Text>
					<Text className="text-gray-500 italic">{email}</Text>
				</View>
				<View className="flex ml-7 mb-5">
					<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
						<Icon
							size={18}
							style={{ color: colors.primary }}
							name="external-link"></Icon>
					</TouchableOpacity>
				</View>
			</View>
			<SignInModal />
			{/* <SignUpModal /> */}
			{/* <GenderModal /> */}
			<View className="flex flex-row pl-8">
				<Text className="text-gray-400">Settings</Text>
			</View>
			<View className="mx-8 mt-4">
				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/Avatar.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Avatar</Text>
					<View className="ml-auto flex-row self-center">
						<Icon
							style={{ color: colors.primary }}
							name="chevron-right"
							size={14}
						/>
					</View>
				</View>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Theme");
					}}
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/Theme.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Theme</Text>
					<View className="ml-auto flex-row self-center">
						<Icon
							style={{ color: colors.primary }}
							name="chevron-right"
							size={14}
						/>
					</View>
				</TouchableOpacity>

				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/Push.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Push Notification</Text>
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
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/DarkMode.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Dark Mode</Text>
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
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/Sharing.png")}
					/>
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
					className="flex flex-row border-solid border-b-2 py-4 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../assets/images/settings/Premium.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Go Premium Section</Text>
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
					className="flex flex-row border-solid py-4 items-center">
					<View className="flex flex-col">
						<Text className="text-gray-400">My account</Text>
						<Text
							style={{ color: colors.primary }}
							className="text-lg font-extrabold items-center justify-center ">
							Logout
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Settings;
