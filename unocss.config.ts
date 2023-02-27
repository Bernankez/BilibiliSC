import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from "unocss";
import { colorBackground, colorDarkBackground, colorDarkDefault, colorDefault, colorDisabled, colorPrimaryRed } from "@bernankez/theme";

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetAttributify()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: colorPrimaryRed,
      default: colorDefault,
      darkDefault: colorDarkDefault,
      disabled: colorDisabled,
      background: colorBackground,
      darkBackground: colorDarkBackground,
    },
  },
});
