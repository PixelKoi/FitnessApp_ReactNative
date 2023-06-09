/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./account/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./screens/**/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#E07594",
				"button-focus": "#E07594",
				"button-blur": "#F6E6EB",
				background: "#FFFFFF",
			},
		},
	},
	plugins: [],
};
