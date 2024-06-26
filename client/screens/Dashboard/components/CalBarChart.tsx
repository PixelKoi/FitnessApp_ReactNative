import React from "react";
import { View, StyleSheet } from "react-native";
import {
	VictoryChart,
	VictoryBar,
	VictoryAxis,
	VictoryPie,
	VictoryLabel,
} from "victory-native";
import { Dimensions } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";
import { Surface } from "react-native-paper";

function CalBarChart({ caloriesRemaining, protein, fats, carbs }) {
	const data = [
		{
			category: `${protein.toFixed(0)}g Protein`,
			amount: protein,
			color: "#FAAEF3",
		},
		{ category: `${fats.toFixed(0)}g Fat`, amount: fats, color: "#FAB6AF" },
		{
			category: `${carbs.toFixed(0)}g Carbs`,
			amount: carbs,
			color: "#95A8E6",
		},
	];

	const { colors } = useAppSelector((state) => state.theme);

	const total = 100;
	const filledValue = 55; // Change this to your actual data value

	return (
		<Surface className="flex flex-row justify-center items-center bg-white rounded-2xl">
			<VictoryChart
				width={Dimensions.get("window").width / 2}
				height={180}
				domainPadding={{ x: 13 }}
				padding={{ top: 55, bottom: 40, left: 40, right: 20 }}>
				{data.map((datum, index) => (
					<VictoryLabel
						style={{ fontFamily: "System" }}
						key={index}
						x={40}
						y={53 + index * 30} // adjust as needed
						text={datum.category}
					/>
				))}

				<VictoryAxis offsetX={200} tickFormat={() => ""} />
				<VictoryBar
					animate={{
						animationWhitelist: ["style", "data", "labels"],
						onExit: {
							duration: 500,
							before: () => ({ opacity: 0.3, _y: 0 }),
						},
						onEnter: {
							duration: 500,
							before: () => ({ opacity: 0.3, _y: 0 }),
							after: (datum) => ({ opacity: 1, _y: datum._y }),
						},
					}}
					horizontal
					data={data}
					x="category"
					y="amount"
					cornerRadius={5}
					style={{
						data: {
							fill: ({ datum }) => datum.color,
						},
					}}
				/>
			</VictoryChart>

			<VictoryChart
				width={Dimensions.get("window").width / 2}
				height={180}
				padding={{ top: 50, bottom: 50, left: 50, right: 50 }}>
				<VictoryAxis
					dependentAxis
					crossAxis
					offsetX={200}
					standalone={false}
					tickValues={[]}
					tickFormat={() => ""}
				/>
				<VictoryPie
					innerRadius={55}
					cornerRadius={5}
					radius={40}
					labels={() => null}
					colorScale={["#6F7CF2", "rgba(111, 124, 242, 0.2)"]} // "tomato" for filled part, "lightgray" for unfilled part
					data={[{ y: filledValue }, { y: total - filledValue }]}
				/>
				<VictoryLabel
					textAnchor="middle" // This will center the text
					x={Dimensions.get("window").width / 4} // Half of the half width of the screen
					y={96} // Slightly more than half of the height of the VictoryChart
					style={[
						{
							fontSize: 24,
							color: "#28323B",
							fontWeight: "bold",
							fontFamily: "System",
							lineHeight: 40,
						},
						{ fontWeight: "400", fontSize: 14 },
					]}
					text={[`${caloriesRemaining}`, "remaining"]}
				/>
			</VictoryChart>
		</Surface>
	);
}

export default CalBarChart;
