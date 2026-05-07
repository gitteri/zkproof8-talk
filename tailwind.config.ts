import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0F",
          softer: "#14141A",
          line: "#1F1F28",
        },
        bone: {
          DEFAULT: "#F5F5F2",
          dim: "#A3A3AD",
          mute: "#6B6B78",
        },
        sol: {
          purple: "#9945FF",
          magenta: "#DC1FFF",
          green: "#14F195",
          teal: "#19FB9B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "deck-xs": ["1.125rem", { lineHeight: "1.6" }],
        "deck-sm": ["1.375rem", { lineHeight: "1.55" }],
        "deck-base": ["1.75rem", { lineHeight: "1.45" }],
        "deck-lg": ["2.5rem", { lineHeight: "1.2" }],
        "deck-xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "0" }],
        "deck-2xl": ["5.5rem", { lineHeight: "1", letterSpacing: "0" }],
        "deck-3xl": ["7.5rem", { lineHeight: "0.95", letterSpacing: "0" }],
      },
      backgroundImage: {
        "sol-gradient":
          "linear-gradient(90deg, #9945FF 0%, #DC1FFF 50%, #14F195 100%)",
        "sol-gradient-soft":
          "linear-gradient(90deg, rgba(153,69,255,0.25) 0%, rgba(220,31,255,0.25) 50%, rgba(20,241,149,0.25) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
