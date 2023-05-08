import Auth from "./screens/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuickLog from "./applicationTabs/QuickLog";
import Profile from "./applicationTabs/Profile";
import Fasting from "./applicationTabs/Fasting";
import Export from "./screens/Export";
import {
	BookOpenIcon,
	ClockIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
} from "react-native-heroicons/outline";
import Diary from "./applicationTabs/Diary";
import profile from "./applicationTabs/Profile";
import React from "react";
import Account from "./screens/Account";
const Tab = createBottomTabNavigator();

export default function NavigationComponent() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Food Log"
					component={ApplicationContainer}
				/>
				<Stack.Screen name="Login" component={Auth} />
				<Stack.Screen name="Export" component={Export} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export function ApplicationContainer() {
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
				component={profile}
				options={{
					tabBarIcon: ({ color, size }) => (
						<UserCircleIcon name="ios-add" size={20} color="black" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const Stack = createNativeStackNavigator();
