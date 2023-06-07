import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import SumGraph from "./DonutGraphs/SumDonutGraph";
import { Button } from "react-native-paper";
import CalDonutGraph from "./DonutGraphs/CalDonutGraph";
import FastingDonutGraph from "./DonutGraphs/FastingDonutGraph";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "../../../app/hooks";

interface Props {
	weekView?: boolean;
}

const Dashboard = (props: Props) => {
	//intiate meditation redux states
	const { medStreak } = useAppSelector((state) => state.meditation);
	const { dailyCal } = useAppSelector((state) => state.user);

	//Calendar date selector
	const [selected, setSelected] = useState("");
	const handleDateSelect = (date: string) => {
		setSelected(date);
	};

	const { weekView } = props;
	return (
		<View className="flex justify-centerr ">
			{/* <CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider> */}
			<Text>Daily Cal: {dailyCal}</Text>
			<View className="flex flex-row justify-center mt-10 mx-6 bg-white py-4">
				<View className="flex justify-center ">
					<Text className="text-base mb-2 px-2">SUM</Text>
					<SumGraph />
				</View>
				<View className="gap-5 ml-4 mt-1 self-center">
					<View className="flex-row">
						<View
							className="my-auto"
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "green",
								marginRight: 6,
							}}
						/>
						<Text className="ml-1 my-auto text-xs self-auto">Fasting</Text>
						{/* <FontAwesome5 name="award" size={14} color="black" /> */}
					</View>
					<View className="flex-row">
						<View
							className="my-auto"
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "green",
								marginRight: 6,
							}}
						/>
						<Text className="ml-1 text-xs self-auto">Nutrition</Text>
						{/* <FontAwesome5 name="award" size={14} color="black" /> */}
					</View>
					<View className="flex-row">
						<View
							className="my-auto"
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "green",
								marginRight: 6,
							}}
						/>
						<Text className="ml-1 text-xs">Mindfulness</Text>
						{/* <FontAwesome5 name="award" size={14} color="black" /> */}
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
				{Object.entries(medStreak).map(([day, completed], index) => (
					<View
						key={index}
						style={{
							margin: 6,
							width: 20,
							height: 20,
							borderRadius: 10,
							backgroundColor: completed ? "green" : "gray",
						}}></View>
				))}
			</View>
			<View className="mt-2">
				<Text className="text-center">Streak: 0</Text>
			</View>
		</View>
	);
};

export default Dashboard;
