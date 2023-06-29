import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Surface } from "react-native-paper";
import { useAppSelector } from "../../../../redux-manager/hooks";
import CircadianChicken from "../../../../assets/images/fasting-dash/CircadianChicken.png";
import ClockFast from "../../../../assets/images/fasting-dash/ClockFast.png";
import BurgerFast from "../../../../assets/images/fasting-dash/BurgerFast.png";

const FastingCard = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	return (
		<View className="pb-5">
			<Surface
				className="flex-row items-center justify-center"
				style={{
					height: 140,
					width: 320,
					backgroundColor: colors.secondary,
					borderRadius: 20,
				}}>
				<Image source={props.chickenIMG} className="mr-3" />

				<View className="gap-3 ml-1">
					<View className="">
						<Text
							style={{ fontSize: 18, color: colors.primary }}
							className="font-bold">
							{props.title}
						</Text>
					</View>

					<View className="flex-row">
						<Text style={{ width: 170, fontSize: 12 }}>
							{props.description}
						</Text>
					</View>

					<View
						className="opacity-50 rounded-full"
						style={{
							backgroundColor: colors.primary,
							width: 70,
							height: 20,
						}}>
						<Text
							style={{ color: "#ffff", fontSize: 10 }}
							className="self-center my-auto">
							{props.fastingTime} HOURS
						</Text>
					</View>
				</View>
			</Surface>
		</View>
	);
};

export default FastingCard;
