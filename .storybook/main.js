const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports =
	{
		core: { builder: "webpack5" },
		stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
		addons: [
			"@storybook/addon-links",
			"@storybook/addon-essentials",
			"storybook-addon-sass-postcss",
			"storybook-dark-mode",
			"@storybook/addon-a11y",
		],
		babel: async (options) => ({
			...options,
			presets: ["solid", ...options.presets],
		}),
		webpackFinal: async (config) => {
			config.resolve.plugins =
				[
					...(config.resolve.plugins || []),
					new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
				];
			return config;
		},
	};
