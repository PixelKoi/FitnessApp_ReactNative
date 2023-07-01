import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../redux-manager/hooks";

const CustomCalendar = () => {
  const { colors } = useAppSelector((state) => state.theme);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const currentWeek = [];

  function isPreviousDate(inputDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset the time of today to 00:00:00

    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0); // reset the time of the given date to 00:00:00

    return givenDate.getTime() <= today.getTime();
  }

  function isWithinTwoWeeks(inputDate) {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // set the date to two weeks ago
    twoWeeksAgo.setHours(0, 0, 0, 0); // reset the time to 00:00:00

    const givenDate = new Date(inputDate);
    givenDate.setHours(0, 0, 0, 0); // reset the time of the given date to 00:00:00

    return givenDate.getTime() >= twoWeeksAgo.getTime();
  }

  // Determine the range of days to display (e.g., 3 days before current day, current day, and 3 days after)
  for (let i = -3; i <= 3; i++) {
    const day = new Date(selectedDate);
    day.setDate(day.getDate() + i);
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
      fontSize: 16,
      color: "grey",
      opacity: 0.4,
    },
    futureDayOfMonth: {
      fontSize: 16,
      color: "grey",
      opacity: 0.4,
    },
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      {currentWeek.map((day, index) => {
        const isSelected =
          day.getDate() === selectedDate.getDate() &&
          day.getMonth() === selectedDate.getMonth() &&
          day.getFullYear() === selectedDate.getFullYear();
        const isTodayOrBefore = isPreviousDate(day);
        const withinTwoWeeks = isWithinTwoWeeks(day);
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              isSelected && styles.currentDayContainer,
              !isTodayOrBefore && styles.futureDayContainer, // Apply styles for future days
            ]}
            onPress={() =>
              isTodayOrBefore && withinTwoWeeks && setSelectedDate(day)
            } // Disable the onPress action for future days and dates more than two weeks ago
          >
            <Text
              style={
                isSelected
                  ? styles.currentDayOfWeek
                  : !isTodayOrBefore
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
                  : !isTodayOrBefore
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
