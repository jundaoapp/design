import "../src/components/style";
import { attachDevtoolsOverlay } from '@solid-devtools/overlay';
import { Parameters } from "@kachurun/storybook-solid-vite";

attachDevtoolsOverlay();

export const parameters: Parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
	// darkMode: {
	// 	// Override the default light theme
	// 	light: {
	// 		...themes.normal,

	// 		brandTitle: "Jundao Design",
	// 		brandUrl: "https://github.com/jundaoapp/design",
	// 		brandImage: bannerDark,

	// 		// Typography
	// 		fontBase: '"Inter", sans-serif',
	// 		fontCode: '"JetBrains Mono", monospace',

	// 		// UI
	// 		appBg: "#fafafa",
	// 		appContentBg: "#ffffff",
	// 		appBorderColor: "#d9d9d9",
	// 		appBorderRadius: "1rem",

	// 		// Text colors
	// 		textColor: "#000000",
	// 		textInverseColor: "#fafafa",

	// 		// Form colors
	// 		inputBg: "white",
	// 		inputBorder: "#000000",
	// 		inputTextColor: "#1f1f1f",
	// 		inputBorderRadius: ".75rem",

	// 		// Toolbar default and active colors
	// 		barTextColor: "#000000",
	// 		barSelectedColor: "#1890ff",
	// 		barBg: "#f5f5f5",
	// 	},
	// 	darkClass: "jdd-dark",
	// 	stylePreview: true,
	// },
};