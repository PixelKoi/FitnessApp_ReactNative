import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FastingCard from "../../../assets/images/timer-dash/FastingCard.png";
import { Surface } from "react-native-paper";

interface CardProps {
	title: string;
	description: string;
	img: any;
	buttonBackgroundColor: string;
	textColor: string;
	cardBackgroundColor: string;
}

const TimerCard = (props: CardProps) => {
	return (
		<TouchableOpacity className="pb-4">
			<Surface
				className="flex-row"
				style={{
					height: 150,
					width: 300,
					backgroundColor: props.cardBackgroundColor,
					borderRadius: 20,
				}}>
				<View>
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
						<TouchableOpacity
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
						</TouchableOpacity>
					</View>
				</View>

				<View className="ml-10 self-center">
					<Image
						style={{ height: 90, width: 107 }}
						source={FastingCard}></Image>
				</View>
			</Surface>
		</TouchableOpacity>
	);
};

export default TimerCard;
