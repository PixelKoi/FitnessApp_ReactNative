import React from "react";
//Screen imports
import Nutrition from "../../screens/Nutrition/Nutrition/Nutrition";
import Diary from "../../screens/Nutrition/Diary/Diary";
import Dashboard from "../../screens/Dashboard/Dashboard";
import Timer from "../../screens/Timers/Timer";
//redux imports
import { ClockIcon } from "react-native-heroicons/outline";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ant from "react-native-vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../../redux-manager/hooks";

const BottomTab = () => {
	const { colors } = useAppSelector((state) => state.theme);

	const BottomTab = createBottomTabNavigator();

	return (
		<BottomTab.Navigator
			initialRouteName="Nutrition"
			screenOptions={{
				tabBarActiveTintColor: "#E07594",
				tabBarInactiveTintColor: "#E0759480",
				tabBarStyle: {
					backgroundColor: "white",
					borderTopColor: "transparent",
					paddingHorizontal: 0,
					paddingTop: 12,
				},
			}}>
			<BottomTab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="view-dashboard-outline"
							size={24}
							color={colors.primary}
						/>
					),
					tabBarLabel: "",
				}}
			/>
			<BottomTab.Screen
				name="Nutrition"
				component={Nutrition}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name="food-apple-outline" size={24} color={colors.primary} />
					),
					tabBarLabel: "",
				}}
			/>
			<BottomTab.Screen
				name="Timer"
				component={Timer}
				options={{
					tabBarIcon: ({ color, size }) => (
						<ClockIcon name="ios-add" size={24} color={colors.primary} />
					),
					tabBarLabel: "",
				}}
			/>
			<BottomTab.Screen
				name="Diary"
				component={Diary}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ant name="book" size={24} color={colors.primary} />
					),
					tabBarLabel: "",
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTab;
