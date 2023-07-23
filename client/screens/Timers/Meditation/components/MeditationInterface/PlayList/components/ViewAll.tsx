import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Modal,
	FlatList,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import { collectionTracks } from "../../../../../../../utils/playlists/collection-sounds";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ViewAll = ({ route }) => {
	const { track, headerTitle } = route.params;
	const navigation = useNavigation();

	useEffect(() => {
		console.log(headerTitle);
	}, []);

	type ItemProps = { title: string; id: string; img: any };
	const Item = ({ title, id, img }: ItemProps) => (
		<View className="flex-row mb-4">
			<TouchableOpacity
				onPress={async () => {
					navigation.navigate("MeditationTimer", {
						track: collectionTracks,
						track_id: id - 1,
						title: collectionTracks[id - 1].title,
					});
				}}>
				<View
					className="mr-4 rounded"
					style={{
						width: 130,
					}}>
					<Image source={img} className="w-full h-28" />
				</View>
			</TouchableOpacity>
			<Text className="mt-3 ml-1 text-white">{title}</Text>
		</View>
	);
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
			<View className="mx-4">
				<Text style={{ fontSize: 40 }} className="mt-4 font-bold text-white">
					{headerTitle}
				</Text>

				<View className="mt-10">
					<FlatList
						horizontal={false}
						data={track}
						renderItem={({ item }) => (
							<Item title={item.title} id={item.id} img={item.img} />
						)}
						keyExtractor={(item) => item.id}
					/>
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

export default ViewAll;
