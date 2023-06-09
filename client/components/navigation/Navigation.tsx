import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
//Screen imports
import Account from "../../screens/account/Account";
import QuickLog from "../../screens/diary/QuickLog";
import Proflile from "../../screens/profile/Profile";
import Diary from "../../screens/diary/Diary";
import Dashboard from "../../screens/dashboard/Dashboard";
import Timer from "../../screens/timer/Timer";
//nav imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Supabse imports
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase_authentication/supabase";
//redux imports
import {
	BookOpenIcon,
	ClockIcon,
	MagnifyingGlassIcon,
	SquaresPlusIcon,
	UserCircleIcon,
} from "react-native-heroicons/outline";
import { useAppDispatch } from "../../redux-manager/hooks";
import {
	setSessionID,
	setUserStates,
} from "../../redux-manager/redux-slice/user-slice";

const Navigation = ({ session }: { session: Session }) => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(false);
	const dispatch = useAppDispatch();

	//Update redux states for profile
	async function updateReduxUserStates(data) {
		await dispatch(
			setUserStates({
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

	const Stack = createNativeStackNavigator();

	const HomeStack = ({ session }: { session: Session }) => {
		return (
			<Stack.Navigator>
				<Stack.Screen name="Login">
					{(props) => <Account {...props} session={session} />}
				</Stack.Screen>
				<Stack.Screen
					options={{ headerShown: false }}
					name="TabNavigator"
					component={TabNavigator}
				/>
			</Stack.Navigator>
		);
	};

	const Tab = createBottomTabNavigator();
	const TabNavigator = () => {
		return (
			<Tab.Navigator
				initialRouteName="QuickLog"
				screenOptions={{
					tabBarActiveTintColor: "#E07594",
					tabBarInactiveTintColor: "black",
					tabBarStyle: {
						backgroundColor: "white",
						borderTopColor: "transparent",
					},
				}}>
				<Tab.Screen
					name="Dashboard"
					component={Dashboard}
					options={{
						tabBarIcon: ({ color, size }) => (
							<SquaresPlusIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="QuickLog"
					component={QuickLog}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MagnifyingGlassIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Diary"
					component={Diary}
					options={{
						tabBarIcon: ({ color, size }) => (
							<BookOpenIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Timer"
					component={Timer}
					options={{
						tabBarIcon: ({ color, size }) => (
							<ClockIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={Proflile}
					options={{
						tabBarIcon: ({ color, size }) => (
							<UserCircleIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
			</Tab.Navigator>
		);
	};

	return (
		<NavigationContainer>
			{loading === true ? (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			) : loading === false && userData === false ? (
				<HomeStack session={session} />
			) : (
				<TabNavigator />
			)}
		</NavigationContainer>
	);
};

export default Navigation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
	},
});