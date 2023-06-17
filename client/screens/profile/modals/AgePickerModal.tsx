import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/FontAwesome";

const AgePickerModal = (props) => {
	//Get Age after selecting date from time picker
	function getAgeFromDateOfBirth(dateOfBirth) {
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();

		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}
	//Get date from time picker
	const [date, setDate] = useState(new Date());

	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setSelectedDate(date);
			props.setAge(getAgeFromDateOfBirth(date));
		}
	};

	return (
		<Modal
			style={{ backgroundColor: "white" }}
			animationType="slide"
			visible={props.showDatePicker}
			transparent>
			<View className="flex bg-primary mt-auto h-60">
				<TouchableOpacity
					className="py-2"
					onPress={() => props.setShowDatePicker(false)}>
					<View className="mx-auto">
						<MaterialIcons name="angle-up" size={30} color={"#ffff"} />
					</View>
				</TouchableOpacity>
				<DateTimePicker
					value={date}
					onChange={handleDateChange}
					textColor="#ffff"
					mode="date"
					display="spinner"></DateTimePicker>
			</View>
		</Modal>
	);
};

export default AgePickerModal;
