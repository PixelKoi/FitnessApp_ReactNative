import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";

const CustomCalendar = () => {
  const { colors } = useAppSelector((state) => state.theme);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const currentWeek = [];

  // Determine the range of days to display (e.g., 3 days before current day, current day, and 3 days after)
  for (let i = -3; i <= 3; i++) {
    const day = new Date();
    day.setDate(currentDay + i);
    currentWeek.push(day);
  }

  const screenWidth = Dimensions.get("window").width;

  const styles = {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.secondary,
      marginTop: 10,
      flexGrow: 1, // Make the container take up the whole width dynamically
    },
    dayContainer: {
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    currentDayContainer: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 14,
      marginTop: -10,
      marginBottom: -10,
    },
    dayOfWeek: {
      fontSize: 16,
      color: colors.primary,
    },
    dayOfMonth: {
      fontSize: 16,
      color: colors.primary,
    },
    currentDayOfWeek: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
    currentDayOfMonth: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      {currentWeek.map((day, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            index === 3 && styles.currentDayContainer,
          ]}
        >
          <Text
            style={index === 3 ? styles.currentDayOfWeek : styles.dayOfWeek}
          >
            {weekDays[day.getDay()]}
          </Text>
          <Text
            style={index === 3 ? styles.currentDayOfMonth : styles.dayOfMonth}
          >
            {day.getDate()}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CustomCalendar;
