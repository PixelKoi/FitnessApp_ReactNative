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
      <CalendarProvider date="2022-08-28">
        <ExpandableCalendar
          style={{ overflow: "hidden", flex: 1 }}
          horizontal={false}
          showClosingKnob={true}
          hideKnob={false}
        />
      </CalendarProvider>
    </View>
  );
};

export default DiaryCalendar;
