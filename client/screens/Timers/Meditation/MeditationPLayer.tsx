import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../redux-manager/hooks";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Music Player
import { setupPlayer, addTrack } from "../../../musicPlayerServices";
import TrackPlayer from "react-native-track-player";
import MusicPlayer from "./components/MusicPlayer";
import { SafeAreaView } from "react-native-safe-area-context";

//Todo: Add lotus icon above start meditating button
const MeditationPLayer = ({ route }) => {
	//navigation
	const navigation = useNavigation();
	const { track, track_id, title } = route.params;

	//import redux
	const { colors } = useAppSelector((state) => state.theme);

	//Track states
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	//Todo: if current playlist skip to track id
	//Todo: if not current playist remove queue and add playlist
	async function setup() {
		const isSetup = await setupPlayer();

		//if setup add track
		if (isSetup) {
			await addTrack(track);
			await TrackPlayer.skip(track_id);
		}
		setIsPlayerReady(isSetup);
	}

	useEffect(() => {
		console.log(track);
		setup();
	}, []);

	//if player is not ready
	// if (!isPlayerReady) {
	// 	return (
	// 		<SafeAreaView>
	// 			<ActivityIndicator />
	// 			<Text>Testing</Text>
	// 		</SafeAreaView>
	// 	);
	// }

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#03174C",
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
						<FontAwesome name="angle-left" size={30} color={"#ffff"} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View
			style={{ backgroundColor: "#03174C" }}
			className="flex-1 justify-center">
			<View className="">
				<View style={{ width: 126 }} className=" mx-auto ">
					<Text style={{ color: "#fff" }} className="text-3xl"></Text>
				</View>
			</View>
			<View className="mt-auto mb-20">
				<MusicPlayer />
			</View>
		</View>
	);
};

export default MeditationPLayer;
