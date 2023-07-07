import React from "react";
import { View, Text, Dimensions } from "react-native";
// import { LineChart } from "react-native-charts-kit";
import { useAppSelector } from "../../../redux-manager/hooks";

const WeightGraph = () => {
  const { colors } = useAppSelector((state) => state.theme);

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => colors.primary, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.secondary,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.primary,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View className="items-center">
      <Text
        style={{ color: colors.primary }}
        className="mr-auto ml-6 mb-4 font-bold"
      >
        Your Weight Progress
      </Text>
      {/*<LineChart*/}
      {/*	data={data}*/}
      {/*	width={Dimensions.get("window").width - 40}*/}
      {/*	height={100}*/}
      {/*	verticalLabelRotation={30}*/}
      {/*	chartConfig={chartConfig}*/}
      {/*	bezier*/}
      {/*/>*/}
    </View>
  );
};

export default WeightGraph;
