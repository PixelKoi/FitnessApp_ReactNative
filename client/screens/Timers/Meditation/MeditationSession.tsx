import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
//Redux imports
import { setMaxTime } from "../../../redux-manager/redux-slice/meditation-slice";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";

interface SessionProps {
	title: string;
	cardColor: string;
	textColor: string;
	time: string;
	buttonBackgroundColor: string;
	buttonTextColor: string;
}

const MeditationSession = (props: SessionProps) => {
	//navgiation
	const navigation = useNavigation();

	//redux hooks
	const dispatch = useAppDispatch();

	return (
		<TouchableOpacity
			onPress={async () => {
				await dispatch(setMaxTime(Number(props.time)));
				navigation.navigate("MeditationTimer");
			}}
			className="flex justify-center mr-4"
			style={{
				height: 161,
				width: 135,
				backgroundColor: props.cardColor,
				borderRadius: 10,
			}}>
			<View className="flex-col mt-14 ml-4">
				<Text className="font-bold" style={{ color: props.textColor }}>
					{props.title}
				</Text>
				<Text className="font-medium mt-1" style={{ color: props.textColor }}>
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
							backgroundColor: props.buttonBackgroundColor,
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
