import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CalDonutGraph = (
  props,
  { radius = 70, strokeWidth = 20, duration = 500, color = "blue", delay = 0 }
) => {
  //Initiate User Redux State
  const { dailyCal } = useAppSelector((state) => state.user);

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  // const [elapsed, setElapsed] = useState(0);

  const circleRef = useRef(null);
  const inputRef = useRef(null);

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="justify-center items-center">
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={20}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View className="text-base text-center absolute top-14">
        <Text className="text-center">{dailyCal} calories</Text>
        <Text className="text-center top-1">remaining</Text>
      </View>
    </View>
  );
};

export default CalDonutGraph;
