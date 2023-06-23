import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

interface EmojiProps {
	emotion: string;
	img: any;
}

const MeditationEmoji = (props: EmojiProps) => {
	return (
		<TouchableOpacity className="mr-5 mt-2">
			<Image className="w-10 h-10" source={props.img} />
			<Text
				className="self-center mt-1"
				style={{ fontSize: 10, color: "#9B9B99" }}>
				{props.emotion}
			</Text>
		</TouchableOpacity>
	);
};

export default MeditationEmoji;
