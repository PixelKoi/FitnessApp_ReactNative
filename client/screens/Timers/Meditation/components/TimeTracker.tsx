import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const TimeTracker = () => {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return elapsedTime;
};

export default TimeTracker;
