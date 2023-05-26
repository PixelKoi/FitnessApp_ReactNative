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

interface Props {
	weekView?: boolean;
}

const Dashboard = (props: Props) => {
	const [selected, setSelected] = useState("");

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
				<View className="gap-6 ml-10 mt-1 self-center">
					<Text>Fasting</Text>
					<Text>Nutrition</Text>
					<Text>Mindfulness</Text>
				</View>
			</View>
			<View className="flex justify-center mt-4 mx-6 bg-white py-4 ">
				<View className="flex flex-row justify-center">
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
			<View>
				<Text>Days Meditated: </Text>
			</View>
		</View>
	);
};

export default Dashboard;
