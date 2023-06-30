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
      backgroundColor: colors.secondary, // Use secondary color from the theme
      marginTop: 10,
    },
    dayContainer: {
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    currentDayContainer: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 15,
      marginTop: -10, // Adjust the value based on your needs
      marginBottom: -10, // Adjust the value based on your needs
    },

    dayOfWeek: {
      fontSize: 16,
      color: colors.primary, // Use text color from the theme
    },
    dayOfMonth: {
      fontSize: 16,
      color: colors.primary, // Use secondary color from the theme
    },
    currentDayOfWeek: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white", // Set the text color for the current day to white
    },
    currentDayOfMonth: {
      fontSize: 16,
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
