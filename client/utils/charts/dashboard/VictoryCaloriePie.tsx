import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput, Dimensions } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryPie,
  VictoryLabel,
  VictoryPortal,
} from "victory-native";

const VictoryCaloriePie = (
  props,
  {
    radius = 50,
    strokeWidth = 18,
    duration = 500,
    color = "#E07594",
    delay = 0,
  }
) => {
  //Initiate User Redux State
  const { dailyCal } = useAppSelector((state) => state.user);
  const { colors } = useAppSelector((state) => state.theme);

  const total = 100;
  const filledValue = 55; // Change this to your actual data value
  const remainder = 30;
  return (
    <View className="items-center">
      <View className="absolute self-center">
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
            innerRadius={55}
            cornerRadius={5}
            radius={40}
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
            text={[`${dailyCal}`, "remaining"]}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default VictoryCaloriePie;
