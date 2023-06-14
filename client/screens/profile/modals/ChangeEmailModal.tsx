import React, { useState } from "react";
import { View, Modal, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ChangeEmailModal = (props) => {
	return (
		<Modal style={{ backgroundColor: "re" }} visible={props.visible}>
			<View className="flex-1 h-full justify-center  bg-secondary">
				<AntDesign name="close" onPress={() => props.setShowModal(false)} />
				<View className="mx-4">
					<Text className="bg-primary">True</Text>
				</View>
			</View>
		</Modal>
	);
};

export default ChangeEmailModal;
