import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface PickerComponentProps {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  color: string;
}

const MealPicker: React.FC<PickerComponentProps> = ({
  selectedValue,
  onValueChange,
  color,
}) => {
  const pickerItemStyle = {
    ...styles.pickerItem,
    color: color,
  };

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
      itemStyle={pickerItemStyle}
    >
      <Picker.Item color={"black"} label="Select a meal" value="select" />
      <Picker.Item
        color={selectedValue === "breakfast" ? pickerItemStyle.color : "black"}
        label="Breakfast"
        value="breakfast"
      />
      <Picker.Item
        value="lunch"
        label="Lunch"
        color={selectedValue === "lunch" ? pickerItemStyle.color : "black"}
      />
      <Picker.Item
        color={selectedValue === "dinner" ? pickerItemStyle.color : "black"}
        label="Dinner"
        value="dinner"
      />
      <Picker.Item
        color={selectedValue === "snack" ? pickerItemStyle.color : "black"}
        label="Snack"
        value="snack"
      />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "white",
    color: "white",
    borderRadius: 30,
  },
  pickerItem: {
    fontWeight: "bold",
  },
});

export default MealPicker;
