import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Mono", "ui-monospace", "monospace"],
        serif: ["serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        bnpb: {
          orange: "#ea580c",
          red: "#dc2626",
          dark: "#0f172a",
          card: "#1e293b",
          border: "#334155",
          accent: "#38bdf8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
