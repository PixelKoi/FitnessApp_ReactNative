import React from "react";
import { View, TouchableOpacity } from "react-native";
import FastingCard from "./components/FastingCard";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import { setMaxTime } from "../../../redux-manager/redux-slice/fasting-slice";

const FastingDash = () => {
	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Fasting Overview",
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-4  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} color={colors.primary} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex-col items-center justify-center">
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(13));
						navigation.navigate("Fasting");
					}}>
					<FastingCard
						title={"Circadian Rhythm"}
						fastingTime={13}
						eatingTime={11}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(16));
						navigation.navigate("Fasting");
					}}>
					<FastingCard
						title={"16:8 Intermittent"}
						fastingTime={16}
						eatingTime={8}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(18));
						navigation.navigate("Fasting");
					}}>
					<FastingCard
						title={"18:6 Intermittent"}
						fastingTime={18}
						eatingTime={6}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(20));
						navigation.navigate("Fasting");
					}}>
					<FastingCard
						title={"20:4 Intermittent"}
						fastingTime={20}
						eatingTime={4}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FastingDash;
