import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Card } from "react-native-paper";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: Add Delete button for each Card
// TODO: Add Food button should go to Nutrition Page with given page as `select a meal`

const Meal = (props) => {
  const navigation = useNavigation();

  const { colors } = useAppSelector((state) => state.theme);
  let colors_primary = colors.primary;
  console.log(colors_primary);
  const food_object = props.route.params;
  const food_name = Object.keys(food_object)[0];
  const title_name = capitalizeFirstLetter(food_name);
  const foods = food_object[food_name];
  console.log("PROPS:", foods);

  //Top Nav on Edit Profile Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor: colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          className="ml-5 mt-2"
          onPress={() => {
            navigation.navigate("Diary");
          }}
        >
          <Icon name="angle-left" style={{ color: colors.primary }} size={24} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="mx-8 mt-8">
        <Text style={{ color: colors.primary }} className="font-bold text-3xl">
          {title_name}
        </Text>
        {foods.map((obj) => {
          return (
            <Card
              style={{ backgroundColor: colors.secondary }}
              className="mt-4"
            >
              <Card.Content key={obj.id}>
                <Text
                  className="text-xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {obj.description}
                </Text>
                <Text style={{ color: colors.primary }}>
                  {obj.Calories} Calories
                </Text>
                <View className="flex-row justify-between mt-4">
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center font-bold"
                    >
                      {obj.Protein} G
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center font-bold"
                    >
                      {obj.Carbs} G
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center font-bold"
                    >
                      {obj.Fat} G
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between mt-1">
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center opacity-70"
                    >
                      Protein
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center opacity-70"
                    >
                      Carbs
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ color: colors.primary }}
                      className="text-center opacity-70"
                    >
                      Fat
                    </Text>
                  </View>
                </View>
                <Text></Text>
              </Card.Content>
            </Card>
          );
        })}
      </View>
      <View className="mt-8 items-center">
        <Button
          style={{
            borderRadius: 20,
            backgroundColor: colors.primary,
            borderWidth: 0,
            width: 150,
          }}
          className={`text-center w-30`}
          onPress={() => tabNavigation.navigate("Nutrition")}
        >
          <Text
            className="font-extrabold"
            style={{
              color: colors.background,
            }}
          >
            Add Food
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Meal;
