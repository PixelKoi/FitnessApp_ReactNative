import React from "react";
import { View, Text } from "react-native";
import DiaryBarChartVictory from "../../../utils/charts/diary/barChart/DiaryBarChartVictory";
import CalBarChart from "./CalBarChart";
import { Surface } from "react-native-paper";

const CalGraph = () => {
	return (
		<Surface className=" ">
			<View>
				<CalBarChart
					caloriesRemaining={200}
					protein={12}
					carbs={14}
					fats={12}
				/>
			</View>
		</Surface>
	);
};

export default CalGraph;
