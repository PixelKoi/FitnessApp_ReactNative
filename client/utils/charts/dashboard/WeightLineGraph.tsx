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
        domainPadding={{ x: 25 }}
        minDomain={{ y: 0 }}
        maxDomain={{ y: 20 }}
        theme={theme}
        height={250}
      >
        <VictoryLine
          interpolation="natural"
          data={[
            { x: "Week 1", y: 10 },
            { x: "Week 2", y: 8 },
            { x: "Week 3", y: 12 },
            { x: "Week 4", y: 8 },
          ]}
        />
      </VictoryChart>
    </View>
  );
}

export default WeightLineGraph;
