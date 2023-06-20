import React from "react";
import { Picker } from "@react-native-picker/picker";

interface PickerComponentProps {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
}

const MealPicker: React.FC<PickerComponentProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      <Picker.Item label="Breakfast" value="java" />
      <Picker.Item label="Lunch" value="js" />
      <Picker.Item label="Dinner" value="js" />
      <Picker.Item label="Snack" value="js" />
    </Picker>
  );
};

export default MealPicker;
