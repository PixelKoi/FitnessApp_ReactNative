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
			itemStyle={pickerItemStyle}>
			<Picker.Item color={"black"} label="Select a meal" value="select" />
			<Picker.Item
				color={selectedValue === "Breakfast" ? pickerItemStyle.color : "black"}
				label="Breakfast"
				value="Breakfast"
			/>
			<Picker.Item
				value="Lunch"
				label="Lunch"
				color={selectedValue === "Lunch" ? pickerItemStyle.color : "black"}
			/>
			<Picker.Item
				color={selectedValue === "Lunch" ? pickerItemStyle.color : "black"}
				label="Dinner"
				value="Dinner"
			/>
			<Picker.Item
				color={selectedValue === "Snacks" ? pickerItemStyle.color : "black"}
				label="Snack"
				value="Snacks"
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
