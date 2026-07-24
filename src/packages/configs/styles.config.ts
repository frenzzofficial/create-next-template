import {
  brilliantPerformer,
  consolasligaturizedv2,
  georgia,
  inika,
  inter,
  kode_mono,
  oxanium,
  poppins,
  roboto,
} from "./fonts.config";

/**
 * Shape returned by every next/font loader (Geist, Oxanium, Inika, ...).
 * We only care about the pieces we actually consume.
 */
type FontLoader = {
  variable: string;
  className: string;
};

export type StyleTheme = {
  /**
   * MUST exactly match:
   *  - the file name in `styles/themes/<name>.css`
   *  - the `[data-theme="<name>"]` selector used inside that file
   */
  name: string;
  label: string;
  description: string;
  fonts: readonly FontLoader[];
  /** Where the theme file lives, kept for reference/tooling only. */
  src: string;
};

// REGISTER YOUR OWN THEMES HERE
export const STYLE_THEMES = [
  {
    name: "cosmic-night",
    label: "Cosmic Night",
    description: "A cosmic dark theme",
    fonts: [roboto, inter, poppins],
    src: "@/styles/themes/cosmic-night.css",
  },
  {
    name: "cyantrix-theme",
    label: "Cyantrix",
    description: "A cyan/teal tech theme",
    fonts: [oxanium, inika, kode_mono],
    src: "@/styles/themes/cyantrix-theme.css",
  },
] as const satisfies readonly StyleTheme[];

export const STYLES_THEME_NAMES = STYLE_THEMES.map((theme) => theme.name);
export type StyleThemeName = (typeof STYLE_THEMES)[number]["name"];

/**
 * Fonts mounted on <html> regardless of which theme is active — for
 * personal/brand usage (e.g. `className="font-brilliant"` on a hero name),
 * not tied to any theme's --font-sans/--font-serif/--font-mono slots.
 */
export const PERSONAL_FONTS: readonly FontLoader[] = [
  brilliantPerformer,
  consolasligaturizedv2,
  georgia,
];

export const getStyleTheme = (name: StyleThemeName): StyleTheme => {
  const theme = STYLE_THEMES.find((theme) => theme.name === name);

  if (!theme) {
    throw new Error(
      `Unknown theme "${name}". Register it in packages/configs/styles.config.ts first.`,
    );
  }

  return theme;
};
