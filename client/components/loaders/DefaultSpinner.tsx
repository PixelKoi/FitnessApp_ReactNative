import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux-manager/hooks";

const DefaultSpinner = () => {
	const { colors } = useAppSelector((state) => state.theme);
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" color={colors.primary} />
		</View>
	);
};

export default DefaultSpinner;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-evenly", // Change this to "space-evenly" for equal spacing
		padding: 10,
	},
});
