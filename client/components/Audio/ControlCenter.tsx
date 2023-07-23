import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import TrackPlayer, {
	usePlaybackState,
	State,
	useProgress,
} from "react-native-track-player";
import Icon from "react-native-vector-icons/MaterialIcons";
import { setMeditationTimer } from "../../redux-manager/redux-slice/meditation-slice";
import { useAppDispatch } from "../../redux-manager/hooks";

const ControlCenter = () => {
	const playBackState = usePlaybackState();
	const [trackPosition, setTrackPosition] = useState<number>(0);
	const { position } = useProgress();

	//Initiate redux
	const dispatch = useAppDispatch();

	//go forward 15s
	const skipForward = async () => {
		await setTrackPosition(position);
		await TrackPlayer.seekTo(trackPosition + 15);
	};

	//go back 15s
	const skipBackwards = async () => {
		await setTrackPosition(position);
		await TrackPlayer.seekTo(trackPosition - 15);
	};

	//go to next track in playlist
	const skipToNext = async () => {
		await TrackPlayer.skipToNext();
	};

	//go to previous track in playlist
	const skipToPrevious = async () => {
		await TrackPlayer.skipToPrevious();
	};

	//if track is loaded and paused and ready - play else pause
	const togglePlayback = async (playback: State) => {
		const currentTrack = await TrackPlayer.getCurrentTrack();

		if (currentTrack !== null) {
			if (playback === State.Paused || playback === State.Ready) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	};

	//Increments by 1second everytime audio is playing
	useEffect(() => {
		console.log(playBackState);
		if (playBackState === State.Playing) {
			dispatch(setMeditationTimer(true));
		} else {
			dispatch(setMeditationTimer(false));
		}
	}, [playBackState]);

	return (
		<View className="flex-row justify-center items-center">
			<Pressable onPress={skipToPrevious}>
				<Icon style={{ color: "#fff" }} name="skip-previous" size={40} />
			</Pressable>
			<Pressable
				style={{ marginHorizontal: 24 }}
				onPress={() => togglePlayback(playBackState)}>
				<Icon
					style={{ color: "#fff" }}
					name={playBackState === State.Playing ? "pause" : "play-arrow"}
					size={75}
				/>
			</Pressable>
			<Pressable onPress={skipToNext}>
				<Icon style={{ color: "#fff" }} name="skip-next" size={40} />
			</Pressable>
		</View>
	);
};

export default ControlCenter;
