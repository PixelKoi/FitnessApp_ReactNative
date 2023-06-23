import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MeditationSession = (props) => {
	return (
		<TouchableOpacity
			className="flex justify-center items-center"
			style={{
				height: 161,
				width: 135,
				backgroundColor: props.cardColor,
				borderRadius: 10,
			}}>
			<View className="flex-col justify-center gap-1 mr-8 mt-14">
				<Text className="font-bold" style={{ color: props.textColor }}>
					{props.title}
				</Text>
				<Text className="font-medium" style={{ color: props.textColor }}>
					Course
				</Text>
			</View>

			<View className="flex-row gap-5 mt-auto mb-4">
				<Text className="font-medium" style={{ color: props.textColor }}>
					{props.time} MIN
				</Text>
				<TouchableWithoutFeedback
					style={{
						width: 45,
						height: 20,
						backgroundColor: props.butttonBackgroundColor,
						borderRadius: 10,
					}}>
					<Text
						style={{ fontSize: 10, color: props.buttonTextColor }}
						className="self-center my-auto font-semibold">
						Start
					</Text>
				</TouchableWithoutFeedback>
			</View>
		</TouchableOpacity>
	);
};

export default MeditationSession;
