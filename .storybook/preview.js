import { themes } from "@storybook/theming";
import bannerLight from "./banner-light.svg";
import bannerDark from "./banner-dark.svg";
import { render } from "solid-js/web";
import "../src/components/style";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,

      brandTitle: "Jundao Design",
      brandUrl: "https://github.com/jundaoapp/design",
      brandImage: bannerLight,

      // Typography
      fontBase: '"Inter", sans-serif',
      fontCode: '"JetBrains Mono", monospace',

      // UI
      appBg: "#141414",
      appContentBg: "#141414",
      appBorderColor: "#262626",
      appBorderRadius: "1rem",

      // Text colors
      textColor: "#fafafa",
      textInverseColor: "#000000",

      // Form colors
      inputBg: "#1f1f1f",
      inputBorder: "#262626",
      inputTextColor: "#fafafa",
      inputBorderRadius: ".75rem",

      // Toolbar default and active colors
      barTextColor: "#fafafa",
      barSelectedColor: "#1890ff",
      barBg: "#1f1f1f",
    },
    // Override the default light theme
    light: {
      ...themes.normal,

      brandTitle: "Jundao Design",
      brandUrl: "https://github.com/jundaoapp/design",
      brandImage: bannerDark,

      // Typography
      fontBase: '"Inter", sans-serif',
      fontCode: '"JetBrains Mono", monospace',

      // UI
      appBg: "#fafafa",
      appContentBg: "#ffffff",
      appBorderColor: "#d9d9d9",
      appBorderRadius: "1rem",

      // Text colors
      textColor: "#000000",
      textInverseColor: "#fafafa",

      // Form colors
      inputBg: "white",
      inputBorder: "#000000",
      inputTextColor: "#1f1f1f",
      inputBorderRadius: ".75rem",

      // Toolbar default and active colors
      barTextColor: "#000000",
      barSelectedColor: "#1890ff",
      barBg: "#f5f5f5",
    },
    darkClass: "jdd-dark",
    stylePreview: true,
  },
};

let disposeStory;

export const decorators = [
  (Story) => {
    if (disposeStory) {
      disposeStory();
    }

    const root = document.getElementById("root");
    const solidRoot = document.createElement("div");

    solidRoot.setAttribute("id", "solid-root");

    root.appendChild(solidRoot);

    disposeStory = render(Story, solidRoot);

    return solidRoot;
    // return createRoot(() => Story()); // do not work correctly https://github.com/solidjs/solid/issues/553
  },
];