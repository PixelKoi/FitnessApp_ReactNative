import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";

function DiaryBarChartVictory(props) {
  const data = [
    { category: "Protein", amount: 50 },
    { category: "Fat", amount: 30 },
    { category: "Carbs", amount: 70 },
  ];
  const styles = StyleSheet.create({
    chartContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
  });

  return (
    <View>
      <View style={styles.chartContainer}>
        <VictoryChart
          height={200}
          domainPadding={{ x: 20 }}
          padding={{ top: 20, bottom: 50, left: 70, right: 20 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={() => ""}
            style={{ axis: { stroke: "transparent" } }}
          />
          <VictoryAxis tickFormat={data.map((item) => item.category)} />
          <VictoryBar
            horizontal
            data={data}
            x="category"
            y="amount"
            style={{ data: { fill: "tomato" } }}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

export default DiaryBarChartVictory;
