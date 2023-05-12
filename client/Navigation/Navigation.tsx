import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator, StyleSheet, Text } from "react-native";

//Screen imports
import Account from "../screens/screens/Account";
import QuickLog from "../screens/applicationTabs/QuickLog";
import Proflile from "../screens/applicationTabs/Profile";
import Fasting from "../screens/applicationTabs/Fasting";
import Diary from "../screens/applicationTabs/Diary";
//nav imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	BookOpenIcon,
	ClockIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
} from "react-native-heroicons/outline";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
	changeActivity,
	changeAge,
	changeGender,
	changeGoal,
	changeHeight,
	changeName,
	changeWeight,
} from "../features/user/user-slice";
import { supabase } from "../features/supabase_authentication/supabase";

const Navigation = ({ session }: { session: Session }) => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(false);
	const dispatch = useAppDispatch();

	function updateReduxUserStates(data) {
		dispatch(changeName(data.username));
		dispatch(changeAge(data.age));
		dispatch(changeGender(data.gender));
		dispatch(changeHeight(data.height));
		dispatch(changeWeight(data.weight));
		dispatch(changeActivity(data.activity));
		dispatch(changeGoal(data.goal));
	}

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`*`)
				.eq("id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				updateReduxUserStates(data);
				setUserData(data.created);
				console.log(data.created);
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
					tabBarActiveTintColor: "#6700ff",
					tabBarInactiveTintColor: "#4d4d4d",
					tabBarStyle: {
						backgroundColor: "#84d0ff",
						borderTopColor: "transparent",
					},
				}}>
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
					name="Fasting"
					component={Fasting}
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
				<HomeStack />
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
