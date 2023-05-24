import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Button } from "react-native-paper";

const Dashboard = () => {
	const [selected, setSelected] = useState("");

	return (
		<View className="flex justify-center items-center">
			<Calendar
				onDayPress={(day) => {
					setSelected(day.dateString);
				}}
				markedDates={{
					[selected]: {
						selected: true,
						disableTouchEvent: true,
						selectedDotColor: "orange",
					},
				}}
			/>
			<Text>Hello World</Text>
			<Button mode="contained">Expand</Button>
		</View>
	);
};

export default Dashboard;
