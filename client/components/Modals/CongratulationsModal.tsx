import React from "react";
import { View, Text, Image } from "react-native";
import { Modal, Surface } from "react-native-paper";
import CongratulationsChicken from "../../assets/images/modals/congrats/CongratsChicken1x.png";
import { useAppSelector } from "../../redux-manager/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

const CongratulationsModal = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const { name } = useAppSelector((state) => state.user);

	return (
		<Modal visible={props.showComgratsModal}>
			<Surface
				style={{
					display: "flex",
					backgroundColor: "#ffff",
					height: 412,
					width: 295,
					marginLeft: "auto",
					marginRight: "auto",
				}}
				className="rounded-2xl">
				<View className="mt-4">
					<Text
						style={{ color: colors.primary }}
						className="self-center font-bold text-xl">
						Well done {name}!
					</Text>
					<Text
						style={{ color: colors.primary }}
						className="self-center font-bold text-xl">
						You fasted for hours!
					</Text>
					<View className="mx-auto mt-8">
						<Image source={CongratulationsChicken} />
					</View>
				</View>
				<View className="mt-8">
					<Text
						style={{ color: colors.primary }}
						className="ml-6 font-bold text-xl">
						How do you feel?
					</Text>
				</View>
				<TouchableOpacity
					className="ml-6 mt-5"
					onPress={() => props.setShowCongratsModal(false)}>
					<Text>Close</Text>
				</TouchableOpacity>
			</Surface>
		</Modal>
	);
};

export default CongratulationsModal;
