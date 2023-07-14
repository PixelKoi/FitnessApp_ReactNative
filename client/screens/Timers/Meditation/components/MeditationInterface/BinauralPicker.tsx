import React from "react";
import { View, Text, Modal } from "react-native";
import {} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../../../../../redux-manager/hooks";
import binauralData from "../../../../../utils/meditation/binauralData";

const BinauralPicker = (props) => {
	const { colors } = useAppSelector((state) => state.theme);

	return (
		<Modal
			visible={props.showBinauralPicker}
			animationType="slide"
			transparent={true}>
			<View
				style={{ backgroundColor: colors.secondary }}
				className="h-60 mt-auto">
				<TouchableOpacity
					className="ml-auto p-4 mr-2"
					onPress={() => props.setShowBinauralPicker(false)}>
					<Text style={{ fontSize: 20 }}>X</Text>
				</TouchableOpacity>
				<Picker />
			</View>
		</Modal>
	);
};

export default BinauralPicker;
