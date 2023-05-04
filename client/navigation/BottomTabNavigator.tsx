import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import QuickLogTab from "../screens/applicationTabs/QuickLogTab";
import DiaryTab from "../screens/applicationTabs/DiaryTab";
import ExportTab from "../screens/applicationTabs/ExportTab";
import NutritionTab from "../screens/applicationTabs/NutritionTab";
const Tab = createBottomTabNavigator();
import {
	FireIcon,
	MagnifyingGlassIcon,
	BookOpenIcon,
	PaperClipIcon,
} from "react-native-heroicons/outline";
const BottomTabNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="QuickLogTab">
				<Tab.Screen
					name="QuickLogTab"
					component={QuickLogTab}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MagnifyingGlassIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="DiaryTab"
					component={DiaryTab}
					options={{
						tabBarIcon: ({ color, size }) => (
							<BookOpenIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="NutritionTab"
					component={NutritionTab}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FireIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="ExportTab"
					component={ExportTab}
					options={{
						tabBarIcon: ({ color, size }) => (
							<PaperClipIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default BottomTabNavigator;
