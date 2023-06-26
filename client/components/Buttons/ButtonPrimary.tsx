import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ButtonPrimary = (props) => {
	return (
		<TouchableOpacity>
			<Text>{props.title}</Text>
		</TouchableOpacity>
	);
};

export default ButtonPrimary;
