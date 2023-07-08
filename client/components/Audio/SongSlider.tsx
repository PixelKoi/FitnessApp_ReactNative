import Slider from "@react-native-community/slider";
import React from "react";
import { View, Text } from "react-native";
import { useProgress } from "react-native-track-player";

const SongSlider = () => {
	const { position, duration } = useProgress();

	return (
		<View>
			<Slider
				value={position}
				minimumValue={0}
				maximumValue={duration}
				thumbTintColor="#ffff"
				maximumTrackTintColor="#ffff"
				style={{ marginTop: 25, width: 350, height: 40, flexDirection: "row" }}
			/>
			<View style={{ width: 350 }} className="flex-row justify-between ">
				<Text style={{ color: "#fff" }}>
					{new Date(position * 1000).toISOString().substring(15, 19)}
				</Text>

				<Text style={{ color: "#fff" }}>
					{new Date((duration - position) * 1000)
						.toISOString()
						.substring(15, 19)}
				</Text>
			</View>
		</View>
	);
};

export default SongSlider;
