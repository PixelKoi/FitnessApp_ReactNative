import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryAxis } from "victory-native";

function TimerCandlestick({}) {
  return (
    <View>
      <VictoryChart domain={{ y: [0, 24] }} scale={{ x: "time", y: "linear" }}>
        <VictoryAxis
          tickValues={[24, 18, 12, 6, 0]}
          tickFormat={(t) => `${t}h`}
          dependentAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: {
              fontSize: 14,
              padding: 5,
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
              fontSize: 14,
              padding: 5,
              textAnchor: "right",
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}

export default TimerCandlestick;
