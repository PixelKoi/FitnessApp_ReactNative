import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";

const CustomCalendar = () => {
  const { colors } = useAppSelector((state) => state.theme);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDay = selectedDate.getDate();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const currentWeek = [];
  const isFutureDate = (date) => {
    const today = new Date();
    return date > today;
  };

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
      paddingHorizontal: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    currentDayContainer: {
      backgroundColor: colors.primary,
      borderRadius: 14,
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
    futureDayOfWeek: {
      fontSize: 12,
      color: "grey",
    },
    futureDayOfMonth: {
      fontSize: 12,
      color: "grey",
    },
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      {currentWeek.map((day, index) => {
        const isSelected =
          day.getDate() === selectedDate.getDate() &&
          day.getMonth() === selectedDate.getMonth() &&
          day.getFullYear() === selectedDate.getFullYear();
        const isFuture = isFutureDate(day);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              isSelected && styles.currentDayContainer,
              isFuture && styles.futureDayContainer, // Apply styles for future days
            ]}
            onPress={() => !isFuture && setSelectedDate(day)} // Disable the onPress action for future days
          >
            <Text
              style={
                isSelected
                  ? styles.currentDayOfWeek
                  : isFuture
                  ? styles.futureDayOfWeek // Apply styles for future days
                  : styles.dayOfWeek
              }
            >
              {weekDays[day.getDay()]}
            </Text>
            <Text
              style={
                isSelected
                  ? styles.currentDayOfMonth
                  : isFuture
                  ? styles.futureDayOfMonth // Apply styles for future days
                  : styles.dayOfMonth
              }
            >
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomCalendar;
