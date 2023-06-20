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
      <Picker.Item
        color={selectedValue === "breakfast" ? pickerItemStyle.color : "black"}
        label="Breakfast"
        value="breakfast"
      />
      <Picker.Item
        color={selectedValue === "lunch" ? pickerItemStyle.color : "black"}
        label="Lunch"
        value="lunch"
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
  },
  pickerItem: {
    fontWeight: "bold",
  },
});

export default MealPicker;
