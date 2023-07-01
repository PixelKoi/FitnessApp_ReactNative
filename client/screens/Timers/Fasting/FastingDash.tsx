import React from "react";
import { View, TouchableOpacity } from "react-native";
import FastingCard from "./components/FastingCard";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import { setMaxTime } from "../../../redux-manager/redux-slice/fasting-slice";
import CircadianChicken from "../../../assets/images/fasting-dash/CircadianChicken.png";
import SixteenByEightChicken from "../../../assets/images/fasting-dash/168Chicken.png";
import EighteenByFourChicken from "../../../assets/images/fasting-dash/184Chicken.png";
import TwentyByfourChicken from "../../../assets/images/fasting-dash/204Chicken.png";
import CongratulationsModal from "../../../components/Modals/CongratulationsModal";

const FastingDash = () => {
	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Choose Time",
			headerStyle: {
				shadowColor: "transparent",
				borderBottomColor: "transparent",
				borderBottomWidth: 0,
				shadowOpacity: 0,
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerHideShadow: true,
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
		<View className="flex-1 -mt-20 justify-center bg-background">
			<View className="flex-col items-center justify-center">
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(13));
						navigation.navigate("Fasting", { title: "Circadian Rythm" });
					}}>
					<FastingCard
						chickenIMG={CircadianChicken}
						title={"Circadian Rhythm"}
						description={"This fast starts at sunset and lasts to morning"}
						fastingTime={13}
						eatingTime={11}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(16));
						navigation.navigate("Fasting", { title: "16:8 Intermittent" });
					}}>
					<FastingCard
						chickenIMG={SixteenByEightChicken}
						title={"16:8 Intermittent"}
						description={"A 16 hours fast with an 8 hours feeding window"}
						fastingTime={16}
						eatingTime={8}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(18));
						navigation.navigate("Fasting", { title: "18:6 Intermittent" });
					}}>
					<FastingCard
						chickenIMG={EighteenByFourChicken}
						title={"18:6 Intermittent"}
						description={"A 18 hours fast with an 6 hours feeding window"}
						fastingTime={18}
						eatingTime={6}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {
						await dispatch(setMaxTime(20));
						navigation.navigate("Fasting", { title: "20:4 Intermittent" });
					}}>
					<FastingCard
						chickenIMG={TwentyByfourChicken}
						title={"20:4 Intermittent"}
						description={"A 20 hours fast with an 4 hours feeding window"}
						fastingTime={20}
						eatingTime={4}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FastingDash;
