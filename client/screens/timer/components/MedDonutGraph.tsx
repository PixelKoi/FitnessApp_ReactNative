import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MedDonutGraph = (
  props,
  { radius = 130, strokeWidth = 20, color = "blue", elapsed = props.elaosed }
) => {
  const { startDate, endDate, countdown, maxTime } = useAppSelector(
    (state) => state.meditation
  );

  const circleRef = useRef(null);
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  // updates circle circ based on how much time has elapsed
  useEffect(() => {
    const value = (props.elapsed / 100) * maxTime;
    const strokeDashoffset =
      circleCircumference - (value / maxTime) * circleCircumference;
    circleRef.current.setNativeProps({
      strokeDashoffset,
    });
  }, [props.elapsed, maxTime, circleCircumference]);

  return (
    <View className="flex justify-center items-center">
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
            strokeDashoffset={elapsed}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      {countdown ? (
        <Text className="text-3xl text-center absolute">{countdown}</Text>
      ) : (
        <Text className="text-3xl text-center absolute">00:00</Text>
      )}
    </View>
  );
};

export default MedDonutGraph;
