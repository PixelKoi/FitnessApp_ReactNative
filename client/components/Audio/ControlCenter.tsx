import React from "react";
import { View, Text, Pressable } from "react-native";
import TrackPlayer, {
	usePlaybackState,
	State,
} from "react-native-track-player";
import Icon from "react-native-vector-icons/MaterialIcons";
import { playBackService } from "../../musicPlayerServices";

const ControlCenter = () => {
	const playBackState = usePlaybackState();

	// next button
	const skipToNext = async () => {
		await TrackPlayer.skipToNext();
	};

	//previous button
	const skipToPrevious = async () => {
		await TrackPlayer.skipToPrevious();
	};

	const togglePlayerback = async (playback: State) => {
		const currentTrack = await TrackPlayer.getCurrentTrack();

		if (currentTrack !== null) {
			if (playback === State.Paused || State.Ready) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	};

	return (
		<View className="flex-1">
			<Pressable onPress={skipToPrevious}>
				<Icon name="skip-previous" size={40} />
			</Pressable>
			<Pressable onPress={() => togglePlayerback(playBackState)}>
				<Icon
					name={playBackState === State.Playing ? "pause" : "play"}
					size={75}
				/>
			</Pressable>
			<Pressable onPress={skipToNext}>
				<Icon name="skip-next" size={40} />
			</Pressable>
		</View>
	);
};

export default ControlCenter;
