import React, { useState } from "react";
import { Dimensions, View, FlatList } from "react-native";

import TrackPlayer, {
	Event,
	Track,
	useTrackPlayerEvents,
} from "react-native-track-player";
import SongInfo from "../../../../components/Audio/SongInfo";
import ControlCenter from "../../../../components/Audio/ControlCenter";
import SongSlider from "../../../../components/Audio/SongSlider";
import { playListData } from "../../../../constants";

const { width } = Dimensions.get("window");

const MusicPlayer = () => {
	return (
		<View className="flex items-center">
			<SongSlider />
			<ControlCenter />
		</View>
	);
};

export default MusicPlayer;
