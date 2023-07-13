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
      <VictoryChart theme={theme} height={250}>
        <VictoryLine
          interpolation="natural"
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
          ]}
        />
      </VictoryChart>
    </View>
  );
}

export default WeightLineGraph;
