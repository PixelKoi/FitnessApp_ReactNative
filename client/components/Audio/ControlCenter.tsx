import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import TrackPlayer, {
	usePlaybackState,
	State,
	useProgress,
} from "react-native-track-player";
import Icon from "react-native-vector-icons/MaterialIcons";
import { playBackService } from "../../musicPlayerServices";
import TimeTracker from "../../screens/Timers/Meditation/components/TimeTracker";

const ControlCenter = () => {
	const [elapsedTime, setElapsedTime] = useState(0);
	const playBackState = usePlaybackState();
	const [trackPosition, setTrackPosition] = useState<number>(0);
	const { position, duration } = useProgress();
	const [time, setTime] = useState(0);

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

	const togglePlayerback = async (playback: State) => {
		const currentTrack = await TrackPlayer.getCurrentTrack();

		if (currentTrack !== null) {
			if (playback === State.Paused || playback === State.Ready) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	};

	useEffect(() => {
		if (playBackState === State.Playing) {
			const interval = setInterval(() => {
				setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [playBackState]);

	useEffect(() => {
		console.log(elapsedTime);
	}, [elapsedTime]);

	return (
		<View className="flex-row justify-center items-center">
			<Pressable onPress={skipBackwards}>
				<Icon style={{ color: "#fff" }} name="skip-previous" size={40} />
			</Pressable>
			<Pressable
				style={{ marginHorizontal: 24 }}
				onPress={() => togglePlayerback(playBackState)}>
				<Icon
					style={{ color: "#fff" }}
					name={playBackState === State.Playing ? "pause" : "play-arrow"}
					size={75}
				/>
			</Pressable>
			<Pressable onPress={skipForward}>
				<Icon style={{ color: "#fff" }} name="skip-next" size={40} />
			</Pressable>
		</View>
	);
};

export default ControlCenter;
