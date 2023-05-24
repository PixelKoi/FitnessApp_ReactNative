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
import { Button } from "react-native-paper";

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
		<View className="flex justify-center items-center">
			<CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider>
		</View>
	);
};

export default Dashboard;
