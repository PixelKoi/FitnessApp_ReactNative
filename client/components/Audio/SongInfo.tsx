import React, { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { Track } from "react-native-track-player";

type SongInfoProps = PropsWithChildren<{
	track: Track | null | undefined;
}>;

const SongInfo = ({ track }: SongInfoProps) => {
	return (
		<View className="flex justify-center items-center">
			<View>
				<Text style={{ color: "#fff" }}>{track?.title}</Text>
			</View>
			<View>
				<Text style={{ color: "#fff" }}>{track?.name}</Text>
			</View>
			{/* <View>
				<Text style={{ color: "#fff" }}>
					{track?.artists} . {track?.album}
				</Text>
			</View> */}
		</View>
	);
};

export default SongInfo;
