import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";

const BinauralInfoModal = (props) => {
	return (
		<Modal visible={props.showInfo}>
			<View className="flex-1 mx-4">
				<View className="mt-28">
					<TouchableOpacity onPress={() => props.setShowInfo(false)}>
						<Text>Close</Text>
					</TouchableOpacity>
					<View>
						<Text style={{ fontSize: 20 }} className="text-center font-bold">
							Binaural Beats
						</Text>
					</View>
					<View className="gap-5 mt-2">
						<Text>
							Delta Waves: 0.5 to 4 Hz associated with deep sleep and
							unconscious states. They are often used for relaxation, deep
							meditation, and promoting restful sleep.
						</Text>

						<Text>
							Theta Waves: 4 to 8 Hz associated with deep relaxation,
							creativity, and increased intuition. They are commonly used for
							meditation, stress reduction, and enhancing mental clarity.
						</Text>

						<Text>
							Alpha Waves: 8 to 13 Hz associated with a relaxed but alert state
							of mind. They are often used for stress reduction, enhancing
							focus, and promoting a calm and balanced mental state.
						</Text>

						<Text>
							Beta Waves:13 to 30 Hz associated with active thinking, focus, and
							alertness. They are commonly used for increased concentration,
							productivity, and promoting mental activity.
						</Text>

						<Text>
							Gamma Waves: 30 to 100 Hz and are associated with heightened
							perception, problem-solving, and cognitive processing. They are
							often used for memory enhancement, increased mental sharpness, and
							stimulating higher mental functions.
						</Text>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default BinauralInfoModal;
