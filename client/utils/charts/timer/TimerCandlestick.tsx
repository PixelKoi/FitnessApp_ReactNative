import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryAxis, VictoryCandlestick } from "victory-native";
import { useAppSelector } from "../../../redux-manager/hooks";
import Svg, { Rect } from "react-native-svg";

function TimerCandlestick({}) {
	const { colors } = useAppSelector((state) => state.theme);

	const sampleData = [
		{ x: 1, open: 18, close: 20, high: 22, low: 16 }, // Monday: 16-22 hours fasted
		{ x: 2, open: 16, close: 18, high: 20, low: 14 }, // Tuesday: 14-20 hours fasted
		{ x: 3, open: 20, close: 22, high: 24, low: 18 }, // Wednesday: 18-24 hours fasted
		{ x: 4, open: 14, close: 16, high: 18, low: 12 }, // Thursday: 12-18 hours fasted
		{ x: 5, open: 22, close: 24, high: 26, low: 20 }, // Friday: 20-26 hours fasted
		{ x: 6, open: 10, close: 12, high: 14, low: 8 }, // Saturday: 8-14 hours fasted
		{ x: 7, open: 8, close: 10, high: 12, low: 6 }, // Sunday: 6-12 hours fasted
	];

	return (
		<View>
			<VictoryChart
				domainPadding={{ x: 25 }}
				domain={{ y: [24, 0] }}
				scale={{ x: "linear", y: "linear" }}>
				<VictoryAxis
					tickValues={[24, 18, 12, 6, 0]}
					tickFormat={(t) => `${t}h`}
					dependentAxis
					style={{
						axis: { stroke: "transparent" },
						ticks: { stroke: "transparent" },
						tickLabels: {
							fontFamily: "System",
							fontSize: 12,
							opacity: 0.5,
						},
					}}
				/>
				<VictoryAxis
					tickValues={[1, 2, 3, 4, 5, 6, 7]}
					tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
					style={{
						axis: { stroke: "transparent" },
						ticks: { stroke: "transparent" },
						tickLabels: {
							fontFamily: "System",
							fontSize: 12,
						},
					}}
				/>
				<VictoryCandlestick
					candleColors={{
						positive: "#5f5c5b",
						negative: "#c43a31",
						stroke: "transparent",
					}}
					style={{
						data: {
							strokeWidth: 0,
							fill: "#5C7FC7",
							borderBottomRightRadius: 10,
							borderBottomLeftRadius: 10,
						},
					}}
					data={sampleData}
				/>
			</VictoryChart>
		</View>
	);
}

export default TimerCandlestick;
