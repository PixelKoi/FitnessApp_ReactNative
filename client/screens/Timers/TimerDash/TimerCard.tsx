import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";

interface CardProps {
	title: string;
	description: string;
	img: any;
	buttonBackgroundColor: string;
	textColor: string;
	cardBackgroundColor: string;
	height: number;
	width: number;
}

const TimerCard = (props: CardProps) => {
	return (
		<View className="pb-5">
			<Surface
				className="flex-row"
				style={{
					height: 150,
					width: 300,
					backgroundColor: props.cardBackgroundColor,
					borderRadius: 20,
				}}>
				<View style={{ width: 150 }}>
					<View className="flex-col  p-6 ">
						<View className="">
							<Text
								style={{ fontSize: 18, color: props.textColor }}
								className="font-bold">
								{props.title}
							</Text>
							<Text
								className="mt-4"
								style={{ fontSize: 10, color: props.textColor }}>
								{props.description}
							</Text>
						</View>
					</View>
					<View className="p-5 bottom-3">
						<View
							style={{
								width: 60,
								height: 30,
								backgroundColor: props.buttonBackgroundColor,
							}}
							className="rounded-full">
							<Text
								style={{ color: "#ffff" }}
								className="font-semibold my-auto text-center">
								Start
							</Text>
						</View>
					</View>
				</View>

				<View style={{ width: 150 }} className=" items-center self-center">
					<Image
						style={{ height: props.height, width: props.width }}
						source={props.img}></Image>
				</View>
			</Surface>
		</View>
	);
};

export default TimerCard;
