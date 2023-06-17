import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "react-native-vector-icons/FontAwesome";

const ActivityPickerModal = (props) => {
	return (
		<Modal
			style={{ backgroundColor: "white" }}
			animationType="slide"
			visible={props.showActivityPicker}
			transparent>
			<View className="flex bg-primary mt-auto h-60">
				<TouchableOpacity
					className="py-2"
					onPress={() => props.setShowActivityPicker(false)}>
					<View className="mx-auto">
						<MaterialIcons name="angle-up" size={30} color={"#ffff"} />
					</View>
				</TouchableOpacity>
				<Picker
					itemStyle={{ color: "white" }}
					selectedValue={props.selectedActivity}
					onValueChange={(itemValue, itemIndex) => {
						props.setActivityLevel(itemValue);
					}}>
					<Picker.Item
						style={{ color: "#ffff" }}
						label="Sedentary"
						value="Sedentary"
					/>
					<Picker.Item label="Lightly active" value="Lightly active" />
					<Picker.Item label="Moderately active" value="Moderately active" />
					<Picker.Item label="Very active" value="Very active" />
					<Picker.Item label="Extremely active" value="Extremely active" />
				</Picker>
			</View>
		</Modal>
	);
};

export default ActivityPickerModal;
