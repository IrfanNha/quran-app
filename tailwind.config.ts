import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#2e7d32", // hijau utama
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#66bb6a", // hijau lebih muda
					foreground: "#1b5e20",
				},
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
