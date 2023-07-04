import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Icon from "react-native-vector-icons/FontAwesome";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Meal = (props) => {
  const navigation = useNavigation();

  const { colors } = useAppSelector((state) => state.theme);
  let colors_primary = colors.primary;
  console.log(colors_primary);
  const dispatch = useAppDispatch();
  console.log("PROPS:", props.route.params);
  const food_object = props.route.params;
  const food_name = Object.keys(food_object)[0];
  const title_name = capitalizeFirstLetter(food_name);
  //Top Nav on Edit Profile Screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title_name,
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
        <Text>HELLO MEAL PAGE</Text>
      </View>
    </View>
  );
};

export default Meal;
