import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryPie,
  VictoryLabel,
} from "victory-native";
import { Dimensions } from "react-native";
import { useAppSelector } from "../../../../redux-manager/hooks";

function DiaryBarChartVictory({ caloriesRemaining, protein, fats, carbs }) {
  const data = [
    {
      category: `${protein.toFixed(0)}g Protein:`,
      amount: protein,
      color: "#FAAEF3",
    },
    { category: `${fats.toFixed(0)}g Fat:`, amount: fats, color: "#FAB6AF" },
    { category: "Carbs:", amount: carbs, color: "#95A8E6" },
  ];
  const styles = StyleSheet.create({
    chartContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
  });

  const { colors } = useAppSelector((state) => state.theme);

  const total = 100;
  const filledValue = 55; // Change this to your actual data value
  const remainder = 30;
  return (
    <View style={styles.chartContainer} className="flex flex-row">
      <VictoryChart
        width={Dimensions.get("window").width / 2}
        height={200}
        domainPadding={{ x: 40 }}
        padding={{ top: 20, bottom: 50, left: 70, right: 20 }}
      >
        <VictoryAxis
          tickFormat={data.map((item) => item.category)}
          style={{ axis: { stroke: "transparent" } }}
        />
        <VictoryBar
          animate={{
            animationWhitelist: ["style", "data"], // Try removing "size"
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
        height={200}
        padding={{ top: 20, bottom: 50, left: 50, right: 50 }}
      >
        <VictoryAxis
          dependentAxis
          crossAxis
          offsetX={200}
          standalone={false}
          tickValues={[]}
          tickFormat={() => ""}
        />
        <VictoryPie
          innerRadius={70}
          cornerRadius={5}
          radius={50}
          labels={() => null}
          colorScale={[colors.primary, colors.secondary]} // "tomato" for filled part, "lightgray" for unfilled part
          data={[{ y: filledValue }, { y: total - filledValue }]}
        />
        <VictoryLabel
          textAnchor="middle" // This will center the text
          x={Dimensions.get("window").width / 4} // Half of the half width of the screen
          y={90} // Slightly more than half of the height of the VictoryChart
          style={[
            {
              fontSize: 25,
              color: "#28323B",
              fontWeight: "400",
              lineHeight: 40,
            },
            { fontWeight: "400", fontSize: 15 },
          ]}
          text={[`${caloriesRemaining}`, "remaining"]}
        />
      </VictoryChart>
    </View>
  );
}

export default DiaryBarChartVictory;
