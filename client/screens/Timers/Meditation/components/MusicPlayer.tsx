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
	const [track, setTrack] = useState<Track | null>();

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		switch (event.type) {
			case Event.PlaybackTrackChanged:
				const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
				setTrack(playingTrack);
				break;
			default:
				break;
		}
	});

	const renderArtWork = () => {
		return <View></View>;
	};

	return (
		<View className="flex flex-col">
			<FlatList
				horizontal
				data={playListData}
				renderItem={renderArtWork}
				keyExtractor={(song) => song.id.toString()}
			/>
			<SongInfo track={track} />
			<SongSlider />
			<ControlCenter />
		</View>
	);
};

export default MusicPlayer;
