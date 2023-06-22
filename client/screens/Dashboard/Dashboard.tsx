import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import SumGraph from "./DonutGraphs/SumDonutGraph";
import { Button, Surface } from "react-native-paper";
import CalDonutGraph from "./DonutGraphs/CalDonutGraph";
import FastingDonutGraph from "./DonutGraphs/FastingDonutGraph";
import { useAppSelector } from "../../redux-manager/hooks";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { UserCircleIcon } from "react-native-heroicons/outline";
import Ionicons from "react-native-vector-icons/Ionicons";

const Dashboard = (props: Props) => {
  const navigation = useNavigation();
  //intiate meditation redux states
  const { medStreak } = useAppSelector((state) => state.meditation);
  const { colors } = useAppSelector((state) => state.theme);

  //Calendar date selector
  const [selected, setSelected] = useState("");
  const handleDateSelect = (date: string) => {
    setSelected(date);
  };

  const { weekView } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
      headerStyle: {
        shadowColor: "transparent",
      },
      headerTintColor: colors.primary,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <View>
          <TouchableOpacity
            className="mr-8  rounded-full"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Ionicons
              name="ios-settings-sharp"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View className="ml-4">
          <Image
            style={{
              width: 60,
              height: 80,
              transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }],
            }}
            source={require("../../assets/images/dashboard/trophy.png")}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View
      style={{ backgroundColor: colors.background }}
      className="flex-1 justify-center"
    >
      {/* <CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider> */}
      <Surface
        style={{ backgroundColor: colors.background }}
        className="flex flex-row justify-center mt-10 mx-6  py-4 rounded-2xl"
      >
        <View className="flex justify-center mr-8">
          <Text
            style={{ color: colors.primary }}
            className="text-base mb-2 px-2 self-center font-bold"
          >
            SUM
          </Text>
          <SumGraph />
        </View>
        <View className="gap-5 ml-4 mt-1 self-center">
          <View className="flex-row">
            <View
              className="my-auto "
              style={{
                backgroundColor: colors.primary,
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text
              style={{ color: colors.primary }}
              className="ml-1 my-auto text-xs self-auto"
            >
              Fasting
            </Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
          <View className="flex-row mr-10">
            <View
              className="my-auto "
              style={{
                backgroundColor: colors.primary,
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text
              style={{ color: colors.primary }}
              className="ml-1 my-auto text-xs self-auto"
            >
              Nutrition
            </Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
          <View className="flex-row">
            <View
              className="my-auto "
              style={{
                backgroundColor: colors.primary,
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text
              style={{ color: colors.primary }}
              className="ml-1 my-auto text-xs self-auto"
            >
              Mindfulness
            </Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
        </View>
      </Surface>

      <Surface
        style={{ backgroundColor: colors.background }}
        className="flex justify-center mt-4 mx-6  py-4 rounded-2xl"
      >
        <View className="flex flex-row justify-center gap-8">
          <View>
            <Text
              style={{ color: colors.primary }}
              className="text-base mb-2 px-2 self-center font-bold"
            >
              Calories
            </Text>
            <CalDonutGraph />
          </View>
          <View>
            <Text
              style={{ color: colors.primary }}
              className="text-base mb-2 px-2 self-center font-bold"
            >
              Fasting
            </Text>
            <FastingDonutGraph />
          </View>
        </View>
      </Surface>
      <View className="mt-8">
        <Text
          style={{ color: colors.primary }}
          className="text-center text-xsfont-bold"
        >
          Days Meditated
        </Text>
        <View className="flex-row justify-center mt-2">
          {Object.entries(medStreak).map(([day, completed], index) => (
            <View
              key={index}
              style={{
                margin: 6,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: completed ? colors.primary : colors.secondary,
              }}
            ></View>
          ))}
        </View>
        <View className="mt-2 flex-row justify-center ">
          <Text
            style={{ color: colors.primary }}
            className="text-center text-xs self-center "
          >
            Streak: 0
          </Text>

          <Text
            className=" my-auto"
            style={{ marginBottom: 1.3, color: colors.primary }}
          >
            <MaterialCommunityIcons name="fire" size={14} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
