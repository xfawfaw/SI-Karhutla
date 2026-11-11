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
        bebas: ["'PPRightGrotesk'", "var(--font-bebas)", "Impact", "sans-serif"],
        display: ["'PPRightGrotesk'", "var(--font-bebas)", "Impact", "sans-serif"],
        sans: ["'Inter'", "var(--font-sans)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        soft: {
          bg: "#f5f2eb",
          card: "#ffffff",
          dark: "#121212",
          coral: "#dc5645",
          blue: "#4392f1",
          yellow: "#e6a73c",
          green: "#20bf6b",
          cream: "#fbf9f4",
          border: "#121212",
        },
      },
      boxShadow: {
        soft: "4px 4px 0px 0px #121212",
        "soft-sm": "2px 2px 0px 0px #121212",
        "soft-lg": "6px 6px 0px 0px #121212",
        "soft-xl": "8px 8px 0px 0px #121212",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        float: "floatSlow 4s ease-in-out infinite",
        "float-reverse": "floatReverse 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
