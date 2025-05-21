import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        novel: "url('/img/novel-bg.png')",
      },
      backgroundColor: {
        dark: "#0e1621",
        secondary: "#182533",
        third: "#5ac2d1",
      },
      textColor: {
        primary: "#70baf5",
      },
    },
  },
  plugins: [],
};
export default config;
