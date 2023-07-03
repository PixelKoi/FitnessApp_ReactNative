import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import SumGraph from "./DonutGraphs/SumDonutGraph";
import { Button, Surface } from "react-native-paper";
import CalDonutGraph from "./DonutGraphs/CalDonutGraph";

import CalDonutGraph2 from "./DonutGraphs/CalDonutGraph2";
import FastingDonutGraph from "./DonutGraphs/FastingDonutGraph";
import { useAppSelector } from "../../redux-manager/hooks";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { UserCircleIcon } from "react-native-heroicons/outline";
import Ionicons from "react-native-vector-icons/Ionicons";

const Dashboard2 = (props: Props) => {
	const navigation = useNavigation();
	//intiate meditation redux states
	const { medStreak } = useAppSelector((state) => state.meditation);
	const { dailyCal } = useAppSelector((state) => state.user);
	const { colors } = useAppSelector((state) => state.theme);

	//Calendar date selector
	const [selected, setSelected] = useState("");
	const handleDateSelect = (date: string) => {
		setSelected(date);
	};

	const { weekView } = props;

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Dashboard",
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerRight: () => (
				<View>
					<TouchableOpacity
						className="mr-8  rounded-full"
						onPress={() => {
							navigation.navigate("Settings");
						}}>
						<Ionicons
							name="ios-settings-sharp"
							size={30}
							color={colors.primary}
						/>
					</TouchableOpacity>
				</View>
			),
			headerLeft: () => (
				<View className="ml-4">
					<Image
						style={{
							width: 60,
							height: 80,
							transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }],
						}}
						source={require("../../assets/images/dashboard/trophy.png")}
					/>
				</View>
			),
		});
	}, []);

	return (
		<View
			style={{ backgroundColor: colors.background }}
			className="flex-1 justify-center">
			{/* <CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider> */}
			<Text
				style={{ color: colors.primary, fontSize: 14 }}
				className="ml-8 mt-4 font-bold">
				Your Weight Progress
			</Text>

			<Text
				style={{ color: colors.primary, fontSize: 14 }}
				className="ml-8 mt-4 font-bold">
				Activity
			</Text>

			<View className="flex-row justify-center">
				<Surface
					style={{
						backgroundColor: colors.background,
						width: 137,
						height: 196,
					}}
					className="flex mt-4 py-4 rounded-2xl">
					<View className=" flex-col">
						<Text
							style={{ color: colors.primary, fontSize: 18 }}
							className="text-base text-center font-bold">
							Remaining
						</Text>
						<CalDonutGraph2 />
						<Text
							style={{ color: colors.primary }}
							className="text-center font-bold">
							Goal
						</Text>
						<Text
							style={{ color: colors.primary }}
							className="text-center mt-1">
							{dailyCal} cals
						</Text>
					</View>
				</Surface>

				<View className="flex-col">
					<TouchableOpacity>
						<Surface
							style={{
								backgroundColor: colors.background,
								width: 174,
								height: 87,
							}}
							className="flex mt-4 ml-6 py-4 rounded-2xl">
							<View className=" flex-col">
								<Text
									className="font-bold ml-2"
									style={{ color: colors.primary }}>
									Fasting
								</Text>
							</View>
						</Surface>
					</TouchableOpacity>

					<TouchableOpacity>
						<Surface
							style={{
								backgroundColor: colors.background,
								width: 174,
								height: 87,
							}}
							className="flex mt-5 ml-6 py-4 rounded-2xl">
							<View className=" flex-col">
								<Text
									className="font-bold ml-2"
									style={{ color: colors.primary }}>
									Meditation
								</Text>
							</View>
						</Surface>
					</TouchableOpacity>
				</View>
			</View>

			{/* <Surface
				style={{ backgroundColor: colors.background }}
				className="flex justify-center mt-4 mx-6  py-4 rounded-2xl">
				<View className="flex flex-row justify-center gap-8">
					<View>
						<Text
							style={{ color: colors.primary }}
							className="text-base mb-2 px-2 self-center font-bold">
							Calories
						</Text>
						<CalDonutGraph />
					</View>
					<View>
						<Text
							style={{ color: colors.primary }}
							className="text-base mb-2 px-2 self-center font-bold">
							Fasting
						</Text>
						<FastingDonutGraph />
					</View>
				</View>
			</Surface> */}
			<Text style={{ color: colors.primary }} className="ml-8 mt-6 font-bold">
				Water Input
			</Text>
		</View>
	);
};

export default Dashboard2;
