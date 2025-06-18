const path = require("path");
const Solid = require("vite-plugin-solid");
const devtools = require('solid-devtools/vite');

module.exports = {
    stories: ["../src/stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-a11y",
        "@chromatic-com/storybook",
        "@storybook/addon-docs"
    ],

    framework: {
        name: "@kachurun/storybook-solid-vite",
        options: {}
    },

    async viteFinal(config, { configType }) {
		config.plugins.unshift(devtools({
			autoname: true,
		}));

		config.resolve.alias = {
			"@jundao/design": path.resolve(__dirname, "../src/components"),
        };


        config.plugins.push(
                {
                    name: 'disable-treeshake',
                    transform(src, id) {
                        if (id.endsWith('src/components/index.tsx')) {
                            return { moduleSideEffects: 'no-treeshake' };
                        }
                    },
                },
        );

		return config;
	}
};
