import React from "react";
import { View, Text, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../../../../../../../redux-manager/hooks";
import binauralData from "../../../../../../../utils/meditation/binauralData";

const BinauralPicker = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const showData = binauralData.map((beat) => {
		return <Picker.Item label={beat.type} value={beat.type} />;
	});

	return (
		<Modal
			visible={props.showBinauralPicker}
			animationType="slide"
			transparent={true}>
			<View
				style={{ backgroundColor: colors.secondary }}
				className="h-70 mt-auto">
				<View className="flex-row">
					<TouchableOpacity
						className="ml-auto p-4 mr-2 "
						onPress={() => props.setShowBinauralPicker(false)}>
						<Text style={{ fontSize: 20 }}>Done</Text>
					</TouchableOpacity>
				</View>

				<Picker
					selectedValue={props.selectBinaural}
					onValueChange={(itemValue, itemIndex) =>
						props.setSelectedBinaural(itemValue)
					}>
					{showData}
				</Picker>
			</View>
		</Modal>
	);
};

export default BinauralPicker;
