import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { VictoryChart, VictoryAxis, VictoryCandlestick } from "victory-native";
import { Dimensions } from "react-native";

function TimerCandlestick({}) {
  const sampleData = [
    { x: 1, y: 6 }, // Monday: 6 hours
    { x: 2, y: 12 }, // Tuesday: 12 hours
    { x: 3, y: 18 }, // Wednesday: 18 hours
    // ...and so on for the other days
  ];

  return (
    <View>
      <VictoryChart
        domainPadding={{ x: 25, y: 0 }}
        scale={{ x: "linear", y: "linear" }}
      >
        <VictoryAxis
          orientation="left" // Display the axis on the left side
          tickValues={[0, 6, 12, 18, 24]} // Specify tick values for the y-axis
          tickFormat={(tick) => `${tick}h`} // Format tick labels as hours
          style={{
            axis: { stroke: "transparent" }, // Hide the axis line
            ticks: { stroke: "transparent" }, // Hide the ticks
          }}
        />
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7]} // Specify tick values for the x-axis
          tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // Specify tick labels for the x-axis
          orientation="bottom"
        />
        <VictoryCandlestick
          candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
          data={sampleData}
        />
      </VictoryChart>
    </View>
  );
}

export default TimerCandlestick;
