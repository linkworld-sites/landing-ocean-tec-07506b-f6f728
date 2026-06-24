import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#050D12",
        navy: "#0A1F2E",
        cyan: "#00A8CC",
        teal: "#1DFFD0",
        sonar: "#C8D8E0",
        warning: "#FF4D1C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,7vw,6rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem,5vw,4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem,3.5vw,2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      animation: {
        "sonar-1": "sonar 4s ease-out infinite",
        "sonar-2": "sonar 4s ease-out 1.33s infinite",
        "sonar-3": "sonar 4s ease-out 2.66s infinite",
        ticker: "ticker 40s linear infinite",
      },
      keyframes: {
        sonar: {
          "0%": { transform: "scale(0.6)", opacity: "0.15" },
          "70%": { opacity: "0.05" },
          "100%": { transform: "scale(2.0)", opacity: "0" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
