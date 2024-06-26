import React from "react";
//Screen imports
import Nutrition from "../../screens/Nutrition/Nutrition/Nutrition";
import Diary from "../../screens/Nutrition/Diary/Diary";
import NewDashboard from "../../screens/Dashboard/NewDashboard";
import Timer from "../../screens/Timers/Timer";
import Mode from "../../screens/Timers/Mode";
//redux imports
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../../redux-manager/hooks";
import { View, StyleSheet } from "react-native";

const BottomTab = () => {
	//Set navigation instace
	const BottomTab = createBottomTabNavigator();

	const tabBar = [
		{
			route: "Dashboard",
			component: NewDashboard,
			iconName: "view-dashboard-outline",
		},
		{
			route: "Nutrition",
			component: Nutrition,
			iconName: "food-apple-outline",
		},
		{
			route: "Timer",
			component: Timer,
			iconName: "timer-outline",
		},
		{
			route: "Diary",
			component: Diary,
			iconName: "book",
		},
	];

	return (
		<BottomTab.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				tabBarIconStyle: {
					top: 15,
				},
				tabBarStyle: {
					position: "absolute",
					height: 55,
					bottom: 25,
					left: 40,
					right: 40,
					borderRadius: 30,
					backgroundColor: "#6F7CF2",
				},
			}}>
			{tabBar.map((item, index) => {
				return (
					<BottomTab.Screen
						key={index}
						name={item.route}
						component={item.component}
						options={{
							tabBarShowLabel: false,
							tabBarIcon: () => (
								<Icon name={item.iconName} size={24} color={"black"} />
							),
						}}
					/>
				);
			})}
		</BottomTab.Navigator>
	);
};

export default BottomTab;

{
	/* <BottomTab.Navigator
initialRouteName="Dashboard"
screenOptions={{
  tabBarIconStyle: {
    top: 15,
  },
  tabBarStyle: {
    position: "absolute",
    height: 60,
    bottom: 25,
    left: 40,
    right: 40,
    borderRadius: 30,
    backgroundColor: "#6F7CF2",
  },
}}> */
}
