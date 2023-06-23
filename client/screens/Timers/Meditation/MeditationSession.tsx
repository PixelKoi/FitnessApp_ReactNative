import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MeditationSession = (props) => {
	return (
		<TouchableOpacity
			className="flex justify-center items-center mr-4"
			style={{
				height: 161,
				width: 135,
				backgroundColor: props.cardColor,
				borderRadius: 10,
			}}>
			<View className="flex-col justify-center  mt-14">
				<Text className="font-bold" style={{ color: props.textColor }}>
					{props.title}
				</Text>
				<Text className="font-medium" style={{ color: props.textColor }}>
					Course
				</Text>
			</View>

			<View className="flex-row items-center mt-auto mb-4">
				<View style={{ width: 67.5 }}>
					<Text
						className="ml-2 font-medium self-center"
						style={{ color: props.textColor }}>
						{props.time} MIN
					</Text>
				</View>
				<View style={{ width: 67.5 }}>
					<TouchableWithoutFeedback
						className="self-center mr-2"
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
			</View>
		</TouchableOpacity>
	);
};

export default MeditationSession;
