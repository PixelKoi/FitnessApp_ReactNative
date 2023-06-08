import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";
import { add } from "date-fns";
import MedTimer from "./components/MedDonutGraph";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import {
  setTimerStates,
  setMaxTime,
  updateMedStreak,
} from "../../redux-manager/redux-slice/meditation-slice";

const Meditation = () => {
  //Top left nav button - removed top nav
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dayOfWeekMap = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  //Call to fasting redux
  const { maxTime, medStreak } = useAppSelector((state) => state.meditation);
  const dispatch = useAppDispatch();

  //fasting states
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [fasting, setFasting] = useState<String>("Choose Meditation Time");
  const [elapsedTimePercentage, setElapsedTimePercentage] = useState(0);

  //Keep track of starting / ending fast button
  const [clicked, setClicked] = useState(false);

  //handle fasting mode selector
  const [expandList, setExpandList] = useState<boolean>(false);
  const handleExplandList = () => setExpandList(!expandList);

  //start fast function
  const handleStartFast = () => {
    const currentDate = new Date();
    const duration = maxTime; // in hours
    const endTime = add(currentDate, { minutes: duration });

    const dayOfWeek = new Date().getDay();
    const currentDay = dayOfWeekMap[dayOfWeek];
    dispatch(updateMedStreak({ day: currentDay, completed: true }));

    dispatch(
      setTimerStates({
        startDate: currentDate.toString(),
        endDate: endTime.toString(),
      })
    );
    setStartTime(currentDate);
    setEndTime(endTime);
    setClicked((prevClicked) => !prevClicked);
  };

  const handleEndFast = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  //updates elapsed
  const updateElapsedTime = () => {
    if (startTime && endTime) {
      const currentTime = new Date();
      const elapsedTime = currentTime - startTime; // Elapsed time in milliseconds
      const totalTime = endTime - startTime; // Total fasting duration in milliseconds
      const percentage = (elapsedTime / totalTime) * 100;
      const roundedPercentage = percentage.toFixed(0);
      setElapsedTimePercentage(roundedPercentage);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View className="mt-4">
        <List.Accordion
          style={accordionStyle}
          title={fasting}
          left={(props) => <List.Icon {...props} icon="pencil" />}
          expanded={expandList}
          onPress={handleExplandList}
        >
          <List.Item
            title="5 minutes (beginner)"
            onPress={() => {
              setFasting("5 minutes");
              setMaxTime(5);
              setExpandList(false);
            }}
          />
          <List.Item
            title="10 minutes"
            onPress={() => {
              setFasting("10 minutes");
              setMaxTime(10);
              setExpandList(false);
            }}
          />
          <List.Item
            title="15 minutes"
            onPress={() => {
              setFasting("15 minutes");
              setMaxTime(15);
              setExpandList(false);
            }}
          />
          <List.Item
            title="20 minutes (recommended)"
            onPress={() => {
              setFasting("20 minutes");
              setMaxTime(20);
              setExpandList(false);
            }}
          />
          <List.Item
            title="30 minutes (deep)"
            onPress={() => {
              setFasting("30 minutes");
              setMaxTime(30);
              setExpandList(false);
            }}
          />
          <List.Item
            title="45 minutes (expert)"
            onPress={() => {
              setFasting("45 minutes");
              setMaxTime(45);
              setExpandList(false);
            }}
          />
        </List.Accordion>
      </View>
      <View className="mt-10">
        <MedTimer elapsed={elapsedTimePercentage} />
      </View>
      <View className="mt-4">
        <Text className="text-center">Days Meditated</Text>
      </View>
      <View className="flex-row justify-center mt-2">
        {Object.entries(medStreak).map(([day, completed], index) => (
          <View
            key={index}
            style={{
              margin: 6,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: completed ? "green" : "gray",
            }}
          ></View>
        ))}
      </View>
      <View className="mt-2">
        <Text className="text-center">Streak: 0</Text>
      </View>
      <Button
        className="mt-8 w-60 mx-auto"
        icon="brain"
        mode="contained"
        onPress={clicked === false ? handleStartFast : handleEndFast}
      >
        {clicked === false ? "Start Meditating" : "End Meditating"}
      </Button>
    </View>
  );
};

export default Meditation;

const accordionStyle = {
  backgroundColor: "white",
  marginVertical: 10,
  borderRadius: 8,
  elevation: 2,
  width: 300,
  alignSelf: "center",
};
