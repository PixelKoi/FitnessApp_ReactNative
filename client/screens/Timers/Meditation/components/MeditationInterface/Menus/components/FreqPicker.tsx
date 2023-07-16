import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { useAppSelector } from "../../../../../../../redux-manager/hooks";
import frequencyData from "../../../../../../../utils/meditation/frequencyData";

const FreqPicker = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const showData = frequencyData.map((beat) => {
		return <Picker.Item label={beat.type} value={beat.type} />;
	});
	return (
		<Modal
			visible={props.showFreqPicker}
			animationType="slide"
			transparent={true}>
			<View
				style={{ backgroundColor: colors.secondary }}
				className="h-70 mt-auto">
				<View className="flex-row">
					<TouchableOpacity
						className="ml-auto p-4 mr-2 "
						onPress={() => props.setShowFreqPicker(false)}>
						<Text style={{ fontSize: 20 }}>Done</Text>
					</TouchableOpacity>
				</View>

				<Picker
					selectedValue={props.selectFreq}
					onValueChange={(itemValue, itemIndex) =>
						props.setSelectedFreq(itemValue)
					}>
					{showData}
				</Picker>
			</View>
		</Modal>
	);
};

export default FreqPicker;
