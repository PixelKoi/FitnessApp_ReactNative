import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

const Dashboard = (props: Props) => {
  const navigation = useNavigation();
  //intiate meditation redux states
  const { medStreak } = useAppSelector((state) => state.meditation);
  //Calendar date selector
  const [selected, setSelected] = useState("");
  const handleDateSelect = (date: string) => {
    setSelected(date);
  };

  const { weekView } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "History",
      headerStyle: {
        shadowColor: "transparent",
      },
      headerTintColor: "#E07594",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerLeft: () => (
        <View>
          <TouchableOpacity
            className="ml-8 bg-primary rounded-full"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <UserCircleIcon name="ios-add" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View>
          <Text className="ml-8 text-primary rounded-full mr-8">
            <MaterialCommunityIcons name="trophy" size={32} />
          </Text>
        </View>
      ),
    });
  }, []);

  return (
    <View className="flex-1 justify-center bg-background ">
      {/* <CalendarProvider date={new Date()}>
				<ExpandableCalendar firstDay={1} onDayPress={handleDateSelect} />
			</CalendarProvider> */}
      <Surface className="flex flex-row justify-center mt-10 mx-6 bg-white py-4 rounded-2xl">
        <View className="flex justify-center mr-8">
          <Text className="text-base mb-2 px-2 self-center text-primary font-bold">
            SUM
          </Text>
          <SumGraph />
        </View>
        <View className="gap-5 ml-4 mt-1 self-center">
          <View className="flex-row">
            <View
              className="my-auto bg-primary"
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text className="ml-1 my-auto text-xs self-auto text-primary">
              Fasting
            </Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
          <View className="flex-row mr-10">
            <View
              className="my-auto bg-primary"
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text className="ml-1 text-xs self-auto text-primary ">
              Nutrition
            </Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
          <View className="flex-row">
            <View
              className="my-auto bg-primary"
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                marginRight: 6,
              }}
            />
            <Text className="ml-1 text-xs text-primary ">Mindfulness</Text>
            {/* <FontAwesome5 name="award" size={14} color="black" /> */}
          </View>
        </View>
      </Surface>

      <Surface className="flex justify-center mt-4 mx-6 bg-white py-4 rounded-2xl">
        <View className="flex flex-row justify-center gap-8">
          <View>
            <Text className="text-base mb-2 px-2 self-center text-primary font-bold">
              Calories
            </Text>
            <CalDonutGraph />
          </View>
          <View>
            <Text className="text-base mb-2 px-2 self-center text-primary font-bold">
              Fasting
            </Text>
            <FastingDonutGraph />
          </View>
        </View>
      </Surface>
      <View className="mt-8">
        <Text className="text-center text-xs text-primary font-bold">
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
                backgroundColor: completed ? "#E07594" : "#F7ECF0",
              }}
            ></View>
          ))}
        </View>
        <View className="mt-2 flex-row justify-center ">
          <Text className="text-center text-xs self-center  text-primary ">
            Streak: 0
          </Text>

          <Text className="text-primary  my-auto" style={{ marginBottom: 1.3 }}>
            <MaterialCommunityIcons name="fire" size={14} />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
