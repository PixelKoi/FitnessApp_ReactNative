import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import {
	Calendar,
	LocaleConfig,
	CalendarProvider,
	ExpandableCalendar,
	WeekCalendar,
} from "react-native-calendars";
import SumGraph from "./DonutGraphs/SumDonutGraph";
import { Button } from "react-native-paper";
import CalDonutGraph from "./DonutGraphs/CalDonutGraph";
import FastingDonutGraph from "./DonutGraphs/FastingDonutGraph";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

interface Props {
	weekView?: boolean;
}

const Dashboard = (props: Props) => {
	const [selected, setSelected] = useState("");
	const completedDays = [true, false, true, true, false, false, true]; // Sample data for completed days, you can modify it as per your needs

	const handleDateSelect = (date: string) => {
		setSelected(date);
	};

	const { weekView } = props;
	return (
		<View className="flex justify-centerr ">
			<CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider>
			<View className="flex flex-row justify-center mt-40 mx-6 bg-white py-4">
				<View className="flex justify-center ">
					<Text className="text-base mb-2 px-2">SUM</Text>
					<SumGraph />
				</View>
				<View className="gap-5 ml-4 mt-1 self-center">
					<View className="flex-row">
						<FontAwesome5 name="award" size={24} color="black" />
						<Text className="ml-2">Fasting</Text>
					</View>
					<View className="flex-row">
						<FontAwesome5 name="award" size={24} color="black" />
						<Text className="ml-2">Nutrition</Text>
					</View>
					<View className="flex-row">
						<FontAwesome5 name="award" size={24} color="black" />
						<Text className="ml-2">Mindfulness</Text>
					</View>
				</View>
			</View>
			<View className="flex justify-center mt-4 mx-6 bg-white py-4 ">
				<View className="flex flex-row justify-center gap-8">
					<View>
						<Text className="text-base mb-2 px-2">Calories</Text>
						<CalDonutGraph />
					</View>
					<View>
						<Text className="text-base mb-2 px-2">Fasting</Text>
						<FastingDonutGraph />
					</View>
				</View>
			</View>
			<View className="mt-4">
				<Text className="text-center">Days Meditated</Text>
			</View>
			<View className="flex-row justify-center mt-2">
				{completedDays.map((completed, index) => (
					<View
						key={index}
						style={{
							margin: 6,
							width: 20,
							height: 20,
							borderRadius: 10,
							backgroundColor: completed ? "green" : "gray",
						}}>
						{completed && (
							<Feather
								name="check"
								size={10}
								color="white"
								style={{ textAlign: "center", marginTop: -1 }}
							/>
						)}
					</View>
				))}
			</View>
			<View className="mt-2">
				<Text className="text-center">Streak: </Text>
			</View>
		</View>
	);
};

export default Dashboard;
