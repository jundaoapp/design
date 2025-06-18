import { defineConfig } from "tsup-preset-solid";

export default defineConfig(
	[
		{
			entry: "src/components/index.tsx",
		},
	],
	{
		dropConsole: true,
		cjs: false,
		esbuildOptions(options) {
			options.logOverride = {
				"ignored-bare-import": "silent",
			};
		},
	},
);
