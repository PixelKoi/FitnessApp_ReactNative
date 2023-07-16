import { Picker } from "@react-native-picker/picker";
import React from "react";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import ambienceData from "../../../../../../../utils/meditation/ambienceData";
import { useAppSelector } from "../../../../../../../redux-manager/hooks";

const AmbiencePicker = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const showData = ambienceData.map((beat) => {
		return <Picker.Item label={beat.type} value={beat.type} />;
	});
	return (
		<Modal
			visible={props.showAmbiencePicker}
			animationType="slide"
			transparent={true}>
			<View
				style={{ backgroundColor: colors.secondary }}
				className="h-70 mt-auto">
				<View className="flex-row">
					<TouchableOpacity
						className="ml-auto p-4 mr-2 "
						onPress={() => props.setShowAmbiencePicker(false)}>
						<Text style={{ fontSize: 20 }}>Done</Text>
					</TouchableOpacity>
				</View>

				<Picker
					selectedValue={props.selectAmbience}
					onValueChange={(itemValue, itemIndex) =>
						props.setSelectedAmbience(itemValue)
					}>
					{showData}
				</Picker>
			</View>
		</Modal>
	);
};

export default AmbiencePicker;
