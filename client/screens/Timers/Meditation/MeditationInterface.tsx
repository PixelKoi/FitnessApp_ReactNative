import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native";
import ChooseGoalMenu from "./components/MeditationInterface/Menus/ChooseGoalMenu";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BinauralBeatsMenu from "./components/MeditationInterface/Menus/BinauralBeatsMenu";
import PureToneList from "./components/MeditationInterface/PlayList/PureToneList";
import CollectionList from "./components/MeditationInterface/PlayList/CollectionList";
import AmbienceList from "./components/MeditationInterface/PlayList/AmbienceList";
import BinauralCollection from "./components/MeditationInterface/PlayList/BinauralCollection";
import { LinearGradient } from "expo-linear-gradient";
import emoji from "../../../utils/timer/meditation-dash/emoji-data";
import ChooseByGoal from "./components/ChooseByCategory";
import Divider from "../../../components/Dividers/Divider";

const MeditationInterface = () => {
	const navigation = useNavigation();

	const [beatsToggle, setBeatsToggle] = useState(false);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerTransparent: true,
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-2  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} color={"#ffff"} />
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View>
					<Image source={emoji[0].img} style={{ width: 25, height: 25 }} />
				</View>
			),
		});
	}, []);

	return (
		<View className="flex-1">
			<LinearGradient
				colors={[
					"rgba(3, 23, 76, 0.35)",
					"#03174C",
					"rgba(3, 23, 76, 0.81)",
					"rgba(3, 23, 76, 0.54)",
				]}
				locations={[0, 0.2315, 0.7707, 0.9771]}
				style={styles.gradient}
			/>

			<View className="flex-1 mt-28">
				<View className="mx-4 mt-6">
					<ChooseGoalMenu />

					<View className="mt-4">
						<BinauralBeatsMenu
							beatsToggle={beatsToggle}
							setBeatsToggle={setBeatsToggle}
						/>
					</View>

					{/* <View className="mt-4 flex-row">
							<Text style={{ fontSize: 16 }} className="font-bold text-white	">
								Suggested
							</Text>
							<TouchableOpacity className="ml-auto">
								<Text
									style={{ fontSize: 14 }}
									className="mt-auto font-bold text-white	">
									View All
								</Text>
							</TouchableOpacity>
						</View>

						<Divider lineColor={"#fff"} /> */}

					<Divider lineColor={"#fff"} />

					{!beatsToggle && (
						<View className="mt-4">
							<CollectionList />
							<Divider lineColor={"#fff"} />
						</View>
					)}

					{!beatsToggle && (
						<View className="py-4 pb-8">
							<ChooseByGoal />
						</View>
					)}

					{beatsToggle && (
						<View className="mt-4 ">
							<BinauralCollection />
							<Divider lineColor={"#fff"} />
							<View className="mt-4">
								<PureToneList />
							</View>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MeditationInterface;
