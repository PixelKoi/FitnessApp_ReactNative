import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-paper";
//Images
import Running from "../../assets/images/home/HomeScreen_Running.png";
//Import Redux
import { useAppSelector } from "../../redux-manager/hooks";
//Import Modals
import SignUp from "../../utils/settings/profile/modals/modals/SignUpModal";
import SignIn from "../../utils/settings/profile/modals/modals/SignInModal";

const Auth = () => {
	//Show modal hooks
	const [showSignInModal, setShowSignInModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);

	//Redux theme
	const { colors } = useAppSelector((state) => state.theme);

	return (
		<View className="flex-1 mx-8 justify-center self-center">
			<View className="bottom-10">
				<Text className="" style={{ fontSize: 30 }}>
					Welcome to
				</Text>
				<Text style={{ fontSize: 30 }} className="font-bold">
					Sum +
				</Text>
			</View>

			<View className="items-center">
				<Image source={Running} />
			</View>
			<Text className="text-center" style={{ fontSize: 14 }}>
				Register now to gain access to {"\n"} SUM
			</Text>

			{/* Sign up / Sign in buttons */}
			<View className="mt-4 top-14">
				<View className="items-center gap-3">
					<Button
						style={{ backgroundColor: colors.primary, width: 214 }}
						onPress={() => setShowSignUpModal(true)}>
						<Text className="font-bold" style={{ color: "#ffff" }}>
							Sign up for free
						</Text>
					</Button>

					<Button
						style={{ backgroundColor: colors.primary, width: 214 }}
						onPress={() => setShowSignInModal(true)}>
						<Text className="font-bold" style={{ color: "#ffff" }}>
							Sign in
						</Text>
					</Button>
				</View>
			</View>
			{/* Sign Up/In Modals */}
			<SignIn showSignInModal={showSignInModal} />
			<SignUp
				showSignUpModal={showSignUpModal}
				setShowSignUpModal={setShowSignUpModal}
				setShowSignInModal={setShowSignInModal}
			/>
		</View>
	);
};

export default Auth;
