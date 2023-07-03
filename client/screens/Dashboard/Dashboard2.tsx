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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Dashboard2 = (props: Props) => {
	const navigation = useNavigation();
	//intiate meditation redux states
	const { medStreak } = useAppSelector((state) => state.meditation);
	const { countdown } = useAppSelector((state) => state.fasting);
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
				className="ml-8 my-4 font-bold">
				Activity
			</Text>

			<View className="flex-row justify-center gap-5">
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

				<View style={{ height: 196 }} className="flex-col mt-4 items-center">
					<TouchableOpacity>
						<Surface
							style={{
								backgroundColor: colors.background,
								width: 174,
								height: 87,
							}}
							className="flex rounded-2xl">
							<View className="flex-col">
								<View className="flex-row ml-4 mt-3">
									<FontAwesome5 name="clock" size={15} color={colors.primary} />
									<Text
										className="font-bold ml-2"
										style={{ color: colors.primary }}>
										Fasting
									</Text>
								</View>
								<View className="mt-4 ml-4">
									<Text className="font-bold" style={{ color: colors.primary }}>
										{countdown}
									</Text>
								</View>
							</View>
							<View
								style={{ backgroundColor: colors.primary }}
								className="bottom-1 ml-auto mr-4 p-1 px-2 rounded-full">
								<Text style={{ fontSize: 10, color: "#fff" }}>Details</Text>
							</View>
						</Surface>
					</TouchableOpacity>

					<TouchableOpacity className="mt-auto">
						<Surface
							style={{
								backgroundColor: colors.background,
								width: 174,
								height: 87,
							}}
							className="flex rounded-2xl">
							<View className=" lex-col">
								<View className="flex-row ml-4 mt-3">
									<FontAwesome5 name="brain" size={15} color={colors.primary} />
									<Text
										className="font-bold ml-2"
										style={{ color: colors.primary }}>
										Meditation
									</Text>
								</View>
								<View className="flex-row ml-4 mt-4">
									<View className="flex-row">
										<Text
											className="self-center"
											style={{ fontSize: 25, color: colors.primary }}>
											5
										</Text>
										<Text
											className="self-center"
											style={{ fontSize: 14, color: colors.primary }}>
											{" "}
											hours
										</Text>
									</View>
									<View
										style={{ backgroundColor: colors.primary }}
										className="mt-3 ml-auto mr-4 p-1 px-2 rounded-full">
										<Text style={{ fontSize: 10, color: "#fff" }}>Details</Text>
									</View>
								</View>
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
