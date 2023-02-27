import { defineConfig } from "tsup-preset-solid";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig(
	[
		{
			entry: "src/components/index.tsx",
		},
	],
	{
		dropConsole: true,
		cjs: true,
		esbuildPlugins: [sassPlugin()],
		esbuildOptions(options) {
			options.logOverride = {
				"ignored-bare-import": "silent",
			};
		},
	},
);
