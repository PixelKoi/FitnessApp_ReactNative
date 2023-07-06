import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Divider, Text, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import completeDiary from "../../../database/models/Food";
import { useAppSelector, useAppDispatch } from "../../../redux-manager/hooks";
// import { RootState } from "../../redux-manager/store";
import Food from "../../../database/models/Food";
import Icon from "react-native-vector-icons/FontAwesome";
import DiaryCalendar from "../../../utils/calendar/DiaryCalendar";
import CustomCalendar from "../../../utils/calendar/CustomCalendar";
import { BarChart } from "react-native-chart-kit/dist";

const Diary = () => {
  // const dispatch = useAppDispatch();
  const tabNavigation = useNavigation();
  const database = useDatabase();
  const profileInfo = useAppSelector((state) => state.user);
  console.log("PROFILE INFO: ", profileInfo);
  console.log("PROFILE CALS: ", profileInfo.dailyCal);
  const { colors } = useAppSelector((state) => state.theme);
  let primary_color = colors.primary;

  const { breakfast, lunch, dinner, snacks } = useAppSelector(
    (state) => state.inventory
  );

  function calculateTotalMacros(foodItems) {
    const proteinArray = foodItems.map((item) => item.Protein);
    const fatArray = foodItems.map((item) => item.Fat);
    const carbsArray = foodItems.map((item) => item.Carbs);
    const totalProteins = proteinArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const totalCarbs = carbsArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const totalFats = fatArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return { totalProteins, totalCarbs, totalFats };
  }

  const allFoodItems = [...breakfast, ...lunch, ...dinner, ...snacks];

  const { totalProteins, totalCarbs, totalFats } =
    calculateTotalMacros(allFoodItems);

  const data = {
    labels: ["Proteins", "Carbs", "Fats"],
    datasets: [
      {
        data: [totalProteins, totalCarbs, totalFats],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#eff3ff",
    backgroundGradientTo: "#efefef",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  function calculateTotalCalories(foodItems) {
    const caloriesArray = foodItems.map((item) => item.Calories);
    const totalCalories = caloriesArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return totalCalories;
  }

  const breakfast_calories = calculateTotalCalories(breakfast);
  const lunch_calories = calculateTotalCalories(lunch);
  const dinner_calories = calculateTotalCalories(dinner);
  const snacks_calories = calculateTotalCalories(snacks);

  // TODO: ADD react-native-chart-kit daily calories
  // TODO: ADD react-native-calendars, block off from accessing days before registration and don't allow modifying older dates
  React.useLayoutEffect(() => {
    tabNavigation.setOptions({
      title: "Diary",
      headerStyle: {
        shadowColor: "transparent",
      },
      headerTintColor: primary_color,
      headerLeft: () => (
        <TouchableOpacity
          className="ml-4"
          onPress={() => {
            tabNavigation.navigate("Nutrition");
          }}
        >
          <Icon name="angle-left" style={{ color: primary_color }} size={24} />
        </TouchableOpacity>
      ),
    });
  });

  const diaryButton = async () => {
    const food_instance = database.get("foods");

    // console.log("FOODS in 🍉🍉🍉", food_instance);
    console.log("FOODS", typeof selectedFoods[0].food.Carbs);
    //
    // const data = await database.write(async () => {
    //   await database.get<Food>("foods").create((data) => {
    //     data.completeDiary(
    //       (data.calories = selectedFoods[0].food.Calories),
    //       (data.carbs = selectedFoods[0].food.Carbs),
    //       (data.fat = selectedFoods[0].food.Fat),
    //       (data.protein = selectedFoods[0].food.Protein),
    //       (data.description = selectedFoods[0].food.description)
    //     );
    //   });
    // });
    // if (data) {
    //   console.log("Successfully created food post");
    //   const all_food = await database.get("foods").query().fetch();
    //   console.log("food saved in DB!:", all_food);
    // }
  };

  return (
    <View className="flex-1 items-center bg-white">
      <View className="flex-row">
        <CustomCalendar />
      </View>
      <View className="justify-center">
        <Card className="px-4 mt-4">
          <BarChart
            data={data}
            width={300}
            height={220}
            chartConfig={chartConfig}
            horizontal={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text className="py-4">
            {profileInfo.dailyCal} - caloriesConsumed = calories remaining
          </Text>
        </Card>
      </View>
      {/* other content */}
      <View className="w-full">
        <Text
          className="pl-4 font-bold text-2xl"
          style={{ color: colors.primary }}
        >
          Daily Intake
        </Text>
        <TouchableOpacity
          onPress={() => {
            tabNavigation.navigate("Meal", { breakfast: breakfast });
          }}
        >
          <Card
            className="m-4 p-4 rounded-2xl"
            style={{ backgroundColor: colors.secondary }}
          >
            <View className="flex flex-row start-0 px-4 items-center">
              <View className="flex flex-col mr-10">
                <Image
                  style={{ width: 75, height: 70 }}
                  source={require("../../../assets/images/Diary/breakfast.png")}
                />
              </View>
              <View className="flex flex-col">
                <Text
                  style={{ color: colors.primary }}
                  className="font-bold text-2xl"
                >
                  Breakfast
                </Text>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  {breakfast_calories} CALORIES
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <Divider />
      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            tabNavigation.navigate("Meal", { lunch: lunch });
          }}
        >
          <Card
            style={{ backgroundColor: colors.secondary }}
            className="m-4 p-4 rounded-2xl"
          >
            <View className="flex flex-row start-0 px-4 items-center">
              <View className="flex flex-col mr-10">
                <Image
                  style={{ width: 75, height: 70 }}
                  source={require("../../../assets/images/Diary/Lunch.png")}
                />
              </View>
              <View className="flex flex-col">
                <Text
                  style={{ color: colors.primary }}
                  className="font-bold text-2xl"
                >
                  Lunch
                </Text>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  {lunch_calories} CALORIES
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            tabNavigation.navigate("Meal", { dinner: dinner });
          }}
        >
          <Card
            style={{ backgroundColor: colors.secondary }}
            className="m-4 p-4 rounded-2xl"
          >
            <View className="flex flex-row start-0 px-4 items-center">
              <View className="flex flex-col mr-10">
                <Image
                  style={{ width: 75, height: 70 }}
                  source={require("../../../assets/images/Diary/dinner.png")}
                />
              </View>
              <View className="flex flex-col">
                <Text
                  style={{ color: colors.primary }}
                  className="font-bold text-2xl"
                >
                  Dinner
                </Text>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  {dinner_calories} CALORIES
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            tabNavigation.navigate("Meal", { snacks: snacks });
          }}
        >
          <Card
            style={{ backgroundColor: colors.secondary }}
            className="m-4 p-4 rounded-2xl"
          >
            <View className="flex flex-row start-0 px-4 items-center">
              <View className="flex flex-col mr-10">
                <Image
                  style={{ width: 75, height: 70 }}
                  source={require("../../../assets/images/Diary/Coffee.png")}
                />
              </View>
              <View className="flex flex-col">
                <Text
                  style={{ color: colors.primary }}
                  className="font-bold text-2xl"
                >
                  Snacks
                </Text>
                <Text
                  className="font-semibold"
                  style={{ color: colors.primary }}
                >
                  {snacks_calories} CALORIES
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <Divider />
      <View className="pt-8">
        <Button
          className="bg-green-950"
          icon="book"
          mode="text"
          onPress={() => console.log("log it ")}
        >
          Complete Diary
        </Button>
      </View>
    </View>
  );
};

export default Diary;
