import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "../../../utils/supabase_authentication/supabase";
import { setTheme } from "../../../redux-manager/redux-slice/theme-slice";

const ThemeSelector = () => {
	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);
	let colors_primary = colors.primary;
	console.log(colors_primary);
	const dispatch = useAppDispatch();

	// Toggle switch Theme selector (only one at a time
	const [greenSwitch, setGreenSwitch] = useState(colors_primary === "#609966");
	const [bubbleSwitch, setBubbleSwitch] = useState(
		colors_primary === "#E07594"
	);

	// TODO: Diagnose Re-rendering from Theme change Memoization: Utilize the React.memo higher-order component or the useMemo hook to memoize components that depend on the Theme state. This ensures that a component only re-renders when its dependencies change. By memoizing components, you can prevent unnecessary re-rendering of unaffected components.

	const toggleGreen = (value) => {
		setGreenSwitch(value);
		setBubbleSwitch(!value);
		dispatch(setTheme("green_light"));
	};

	const toggleBubble = (value) => {
		setGreenSwitch(!value);
		setBubbleSwitch(value);
		dispatch(setTheme("bubble_gum"));
	};

	//Top Nav on Edit Profile Screen
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Themes",
			headerTintColor: colors.primary,
			headerLeft: () => (
				<TouchableOpacity
					className="ml-5 mt-2"
					onPress={() => {
						navigation.navigate("Settings");
					}}>
					<Icon name="angle-left" style={{ color: colors.primary }} size={24} />
				</TouchableOpacity>
			),
		});
	});

	return (
		<View className="flex-1" style={{ backgroundColor: colors.background }}>
			<View className="mx-8 mt-8">
				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 py-6 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Pink.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Pink</Text>
					<View className="ml-auto flex-row self-center">
						<Switch
							trackColor={{ false: "#767577", true: "#E07594" }}
							thumbColor={bubbleSwitch ? "#f4f3f4" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleBubble}
							value={bubbleSwitch}
							disabled={bubbleSwitch}
						/>
					</View>
				</View>

				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 py-6 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Green.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Green</Text>
					<View className="ml-auto flex-row self-center">
						<Switch
							trackColor={{ false: "#767577", true: "#609966" }}
							thumbColor={greenSwitch ? "#f4f3f4" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleGreen}
							value={greenSwitch}
							disabled={greenSwitch}
						/>
					</View>
				</View>
				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 items-center py-2">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Blue.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Blue</Text>
					<View className="ml-auto flex-row self-center">
						<Image
							style={{
								width: 60,
								height: 80,
								transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }],
							}}
							source={require("../../../assets/images/ThemeSelector/Lock.png")}
						/>
					</View>
				</View>

				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2  items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Lemonade.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Lemonade</Text>
					<View className="ml-auto flex-row self-center">
						<Image
							style={{
								width: 100,
								height: 100,
								transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
							}}
							source={require("../../../assets/images/ThemeSelector/Premium.png")}
						/>
					</View>
				</View>

				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Pink.png")}
					/>
					<Text className="text-lg font-semibold pl-5">Bubble Gum</Text>
					<View className="ml-auto flex-row self-center">
						<Image
							style={{
								width: 100,
								height: 100,
								transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
							}}
							source={require("../../../assets/images/ThemeSelector/Premium.png")}
						/>
					</View>
				</View>
				<View
					style={{ borderColor: colors.secondary }}
					className="flex flex-row border-solid border-b-2 items-center">
					<Image
						style={{ width: 42, height: 42 }}
						source={require("../../../assets/images/ThemeSelector/Pink.png")}
					/>
					<Text className="text-lg font-semibold pl-5">SunFlower</Text>
					<View className="ml-auto flex-row self-center">
						<Image
							style={{
								width: 100,
								height: 100,
								transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
							}}
							source={require("../../../assets/images/ThemeSelector/Premium.png")}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ThemeSelector;
