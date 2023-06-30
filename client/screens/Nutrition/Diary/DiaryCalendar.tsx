import React, { useState } from "react";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  Calendar,
} from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";
import { todayTextColor } from "react-native-calendars/src/style";

const DiaryCalendar = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 and zero-padding the month
  const day = String(currentDate.getDate()).padStart(2, "0"); // Zero-padding the day
  const formattedDate = `${year}-${month}-${day}`;

  const [selected, setSelected] = useState(null);
  const { colors } = useAppSelector((state) => state.theme);

  return (
    <CalendarProvider
      style={{
        height: 100,
        flex: 0,
        backgroundColor: colors.secondary,
      }}
      date={formattedDate}
    >
      <WeekCalendar
        style={{
          height: 0,
          backgroundColor: colors.secondary,
        }}
        disableAllTouchEventsForDisabledDays
        animateScroll={false}
        allowSelectionOutOfRange={false}
        allowShadow={false}
        // maxDate={format(new Date(), "YYYY-MM-DD")}
        //
        onDayPress={(day) => {
          setSelected(day);
          console.log("selected day", day);
        }}
        markedDates={{
          [formattedDate]: {
            marked: true,
            customContainerStyle: {
              borderRadius: 0,
              borderTopLeftRadius: 17,
              borderBottomLeftRadius: 17,
              borderWidth: 2,
              borderColor: "red",
              borderBottomRightRadius: 8,
            },
          },
          [selected]: {
            selected: true,
            marked: true,
          },
        }}
        markingType={"custom"}
        bounces={false}
        bouncesZoom={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        theme={{
          backgroundColor: colors.secondary,
          selectedDotColor: colors.secondary,
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: "#ffffff",
          todayTextColor: colors.primary,
          dayTextColor: "#2d4150",
        }}
        //
      />
    </CalendarProvider>
  );
};

export default DiaryCalendar;
