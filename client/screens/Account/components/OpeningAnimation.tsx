import React from "react";
import { View, Image, Text, Modal } from "react-native";
import Logo from "../../../assets/images/home/Logo.png";

const OpeningAnimation = (props) => {
	return (
		<Modal visible={props.visible} animationType="slide" className="flex-1">
			<View className="flex-1 bg-slate-500 items-center justify-center">
				<Image source={Logo} />
			</View>
		</Modal>
	);
};

export default OpeningAnimation;
