import React from "react";
import { View } from "react-native";
import { BarChart, YAxis, Text } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Text as SVGText } from "react-native-svg";

const DiaryBarChart = () => {
  const data = [
    {
      value: 50,
      label: "PROTEINS",
      svg: {
        fill: "#FAAEF3",
      },
    },
    {
      value: 10,
      label: "CARBS",
      svg: {
        fill: "#FAB6AF",
      },
    },
    {
      value: 40,
      label: "FATS",
      svg: {
        fill: "#95A8E6",
      },
    },
  ];

  const totalValue = 100; // Define the total value

  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <SVGText
        key={index}
        x={x(value.value)}
        y={y(index) + bandwidth / 2}
        fontSize={14}
        fill={"black"}
        alignmentBaseline={"middle"}
      >
        {`${value.value}/${totalValue}`}
      </SVGText>
    ));

  return (
    <View
      style={{
        flexDirection: "row",
        height: 200,
        paddingVertical: 16,
      }}
    >
      <YAxis
        data={data}
        yAccessor={({ index }) => index}
        scale={scale.scaleBand}
        contentInset={{ top: 10, bottom: 10 }}
        spacing={0.2}
        formatLabel={(index) => data[index].label}
      />
      <View style={{ flex: 1, marginLeft: 8, position: "relative" }}>
        <BarChart
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          data={Array(data.length).fill(totalValue)}
          horizontal={true}
          svg={{ fill: "rgba(134, 65, 244, 0.2)" }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        />
        <BarChart
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.value}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Labels />
        </BarChart>
      </View>
    </View>
  );
};

export default DiaryBarChart;
