import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
  darkMode: "selector",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gray-rgb": "var(--gray-rgb)",
        "gray-alpha-200": "var(--gray-alpha-200)",
        "gray-alpha-100": "var(--gray-alpha-100)",
        "button-primary-hover": "var(--button-primary-hover)",
        "button-secondary-hover": "var(--button-secondary-hover)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // this class is applied to `html` by `app/theme-efect.ts`, similar
      // to how `dark:` gets enabled
      addVariant("theme-system", ".theme-system &");
    }),
  ],
};
export default config;
