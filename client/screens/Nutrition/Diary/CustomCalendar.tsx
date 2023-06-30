import React from "react";
import { View, Text } from "react-native";
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

  const styles = {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: colors.secondary, // Use secondary color from the theme
    },
    dayContainer: {
      alignItems: "center",
    },
    currentDayContainer: {
      backgroundColor: colors.primary, // Use primary color from the theme
      borderRadius: 4,
    },
    dayOfWeek: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary, // Use text color from the theme
    },
    dayOfMonth: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary, // Use secondary color from the theme
    },
    currentDayOfWeek: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white", // Set the text color for the current day to white
    },
    currentDayOfMonth: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white", // Set the date color for the current day to white
    },
  };

  return (
    <View style={styles.container}>
      {currentWeek.map((day, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            index === 3 && styles.currentDayContainer, // Apply different styling for the current day
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
