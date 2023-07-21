import React from "react";
import { View } from "react-native";

interface DividerProps {
	lineColor: string;
}

const Divider = ({ lineColor }: DividerProps) => {
	return (
		<View
			className="mt-4 border-b-2 opacity-25"
			style={{
				borderColor: lineColor,
			}}
		/>
	);
};

export default Divider;
