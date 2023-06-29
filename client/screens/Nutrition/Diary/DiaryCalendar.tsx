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

const DiaryCalendar = () => {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <CalendarProvider date="2023-06-28">
        <WeekCalendar
          disableAllTouchEventsForDisabledDays
          animateScroll={false}
          allowSelectionOutOfRange={false}
          allowShadow={false}
          // maxDate={format(new Date(), "YYYY-MM-DD")}
          //
          bounces={false}
          bouncesZoom={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          //
        />
      </CalendarProvider>
    </View>
  );
};

export default DiaryCalendar;
