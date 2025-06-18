import { create } from 'storybook/theming/create';
import bannerLight from "./banner-light.svg";
// import bannerDark from "./banner-dark.svg";
 
export default create({
  base: 'dark',
  
  brandTitle: "Jundao Design",
  brandUrl: "https://github.com/jundaoapp/design",
  brandImage: bannerLight,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // UI
  appBg: "#0d0e0f",
  appContentBg: "black",
  appBorderColor: "#262626",
  appBorderRadius: 16,

  // Text colors
  textColor: "#fafafa",
  textInverseColor: "#000000",

  // Form colors
  inputBg: "#1f1f1f",
  inputBorder: "#262626",
  inputTextColor: "#fafafa",
  inputBorderRadius: 12,

  // Toolbar default and active colors
  barTextColor: "#fafafa",
  barSelectedColor: "#1890ff",
  barBg: "#141516",
});