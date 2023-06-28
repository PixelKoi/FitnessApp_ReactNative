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
					height: 130,
					width: 300,
					backgroundColor: colors.secondary,
					borderRadius: 20,
				}}>
				<Image source={CircadianChicken} className="mr-3" />

				<View className="">
					<View className="">
						<Text
							style={{ fontSize: 18, color: colors.primary }}
							className="font-bold">
							16:8 Intermittent
						</Text>
					</View>
					<View className="gap-2 mt-1">
						<View className="flex-row">
							<View
								className="my-auto"
								style={{
									backgroundColor: "transparent",
									width: 20,
									height: 20,
								}}>
								<Image source={ClockFast} style={{ width: 20 }} />
							</View>
							<View
								className="ml-1 opacity-50 rounded-full"
								style={{
									backgroundColor: colors.primary,
									width: 70,
									height: 20,
								}}>
								<Text
									style={{ color: "#ffff", fontSize: 10 }}
									className="self-center my-auto">
									20 HOURS
								</Text>
							</View>
						</View>
						<View className="flex-row">
							<View
								className="my-auto"
								style={{
									backgroundColor: "transparent",
									width: 20,
									height: 20,
								}}>
								<Image
									source={BurgerFast}
									className="my-auto"
									style={{ width: 20 }}
								/>
							</View>
							<View
								className="ml-1 opacity-50 rounded-full"
								style={{
									backgroundColor: colors.primary,
									width: 70,
									height: 20,
								}}>
								<Text
									style={{ color: "#ffff", fontSize: 10 }}
									className="self-center my-auto">
									4 HOURS
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View className="top-10 right-1">
					<View
						style={{
							width: 50,
							height: 20,
							backgroundColor: colors.primary,
						}}
						className="rounded-full">
						<Text
							style={{ color: "#ffff", fontSize: 10 }}
							className="font-semibold my-auto text-center">
							Start
						</Text>
					</View>
				</View>
			</Surface>
		</View>
	);
};

export default FastingCard;
