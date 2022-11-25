const path = require("path");
const { loadConfigFromFile, mergeConfig } = require('vite');
const Solid = require("vite-plugin-solid");

module.exports = {
  stories: ["../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-a11y",
  ],
  babel: async (options) => ({
    ...options,
    presets: ["solid", ...options.presets],
  }),
  "framework": "@storybook/html",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, { configType }) {
    config.plugins.unshift(Solid({ hot: false }));

    config.resolve.alias = {
      "@jundao/design": path.resolve(__dirname, "../src/components")
    };

    return config;
  },
}