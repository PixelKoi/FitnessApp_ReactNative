import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryPie,
  VictoryLabel,
  VictoryLine,
} from "victory-native";
import { Dimensions } from "react-native";
const theme = {
  line: {
    style: {
      data: {
        stroke: "white",
      },
      labels: {
        fill: "white",
      },
    },
  },
  axis: {
    style: {
      axis: {
        stroke: "transparent",
      },
      grid: {
        stroke: "transparent",
      },
      ticks: {
        stroke: "transparent",
      },
      tickLabels: {
        fill: "white",
      },
    },
  },
};
function WeightLineGraph({ props }) {
  return (
    <View>
      <VictoryChart
        domainPadding={{ x: 40 }}
        minDomain={{ y: 90 }}
        maxDomain={{ y: 300 }}
        theme={theme}
        height={250}
        padding={{ top: 55, bottom: 30, left: 40, right: 10 }}
      >
        <VictoryLabel
          x={20}
          y={20}
          text="Your Weight statistics"
          style={{ fill: "white", fontSize: 16, fontWeight: "500" }}
        />
        <VictoryLine
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          interpolation="natural"
          data={[
            { x: "Week 1", y: 240 },
            { x: "Week 2", y: 210 },
            { x: "Week 3", y: 231 },
            { x: "Week 4", y: 205 },
          ]}
        />
      </VictoryChart>
    </View>
  );
}

export default WeightLineGraph;
