import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
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
  plugins: [],
};
export default config;
