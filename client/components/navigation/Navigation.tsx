import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
//Screen imports
import Settings from "../../screens/Settings/Settings";
import ThemeSelector from "../../screens/Settings/Theme/ThemeSelector";
import MeditationDash from "../../screens/Timers/Meditation/MeditationDash";
import MeditationTimer from "../../screens/Timers/Meditation/MeditationTimer";
import Fasting from "../../screens/Timers/Fasting/Fasting";
//nav imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Supabse imports
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase_authentication/supabase";
//redux imports
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
	setSessionID,
	setUserStates,
} from "../../redux-manager/redux-slice/user-slice";
import UserBioInput from "../../screens/Settings/Profile/EditProfile";
// Import nav
import AccountSetupStack from "./AccountSetupStack";
import BottomTab from "./BottomTab";

function Navigation({ session }: { session: Session }) {
	// Create navigator stack instance
	const Stack = createNativeStackNavigator();

	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(false);
	const dispatch = useAppDispatch();
	const { colors } = useAppSelector((state) => state.theme);

	//Update redux states for Settings
	async function updateReduxUserStates(data) {
		await dispatch(
			setUserStates({
				email: data.email,
				name: data.username,
				gender: data.gender,
				age: data.age,
				height: data.height,
				weight: data.weight,
				activity: data.activity,
				goal: data.goal,
			})
		);
	}

	//Get redux-slice data from supabase and update redux
	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No redux-slice on the session!");

			let { data, error, status } = await supabase
				.from("profile")
				.select(`*`)
				.eq("user_id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				console.log(data);
				updateReduxUserStates(data);
				dispatch(setSessionID(data.user_id));
				setUserData(data.created);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	//Home Navigation
	const InitialSetup = ({ session }: { session: Session }) => {
		return (
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="AccountStepStack">
					{(props) => <AccountSetupStack {...props} session={session} />}
				</Stack.Screen>
				<Stack.Screen
					options={{ headerShown: false }}
					name="NavGroup"
					component={NavGroup}
				/>
			</Stack.Navigator>
		);
	};

	const NavGroup = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="BottomTab"
					component={BottomTab}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Settings"
					component={Settings}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="Profile"
					component={UserBioInput}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="Theme"
					component={ThemeSelector}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="MeditationDash"
					component={MeditationDash}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="MeditationTimer"
					component={MeditationTimer}
					options={{ headerShown: true }}
				/>
				<Stack.Screen
					name="Fasting"
					component={Fasting}
					options={{ headerShown: true }}
				/>
			</Stack.Navigator>
		);
	};

	return (
		<NavigationContainer>
			{loading === true ? (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color={colors.primary} />
				</View>
			) : loading === false && userData === false ? (
				<InitialSetup session={session} />
			) : (
				<NavGroup />
			)}
		</NavigationContainer>
	);
}

export default Navigation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-evenly", // Change this to "space-evenly" for equal spacing
		padding: 10,
	},
});
