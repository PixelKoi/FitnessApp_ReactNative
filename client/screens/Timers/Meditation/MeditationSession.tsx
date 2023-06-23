import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MeditationSession = (props) => {
	return (
		<View
			className="flex justify-center items-center"
			style={{
				height: 161,
				width: 135,
				backgroundColor: "#8E97FD",
				borderRadius: 10,
			}}>
			<View className="flex-col justify-center gap-1 mr-8 mt-14">
				<Text className="font-bold" style={{ color: "#FDEACD" }}>
					Sleep Better
				</Text>
				<Text className="font-medium" style={{ color: "#FDEACD" }}>
					Course
				</Text>
			</View>

			<View className="flex-row gap-5 mt-auto mb-4">
				<Text className="font-medium" style={{ color: "#FDEACD" }}>
					35 MIN
				</Text>
				<TouchableOpacity
					style={{
						width: 45,
						height: 20,
						backgroundColor: "#EBEAEC",
						borderRadius: 10,
					}}>
					<Text
						style={{ fontSize: 10 }}
						className="self-center my-auto font-semibold">
						Start
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MeditationSession;
