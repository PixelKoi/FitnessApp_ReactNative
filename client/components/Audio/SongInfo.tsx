import React, { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { Track } from "react-native-track-player";

type SongInfoProps = PropsWithChildren<{
	track: Track | null | undefined;
}>;

const SongInfo = ({ track }: SongInfoProps) => {
	return (
		<View>
			<View>
				<Text>{track?.title}</Text>
			</View>
			<View>
				<Text>{track?.name}</Text>
			</View>
			<View>
				<Text>
					{track?.artists} . {track?.album}
				</Text>
			</View>
		</View>
	);
};

export default SongInfo;
