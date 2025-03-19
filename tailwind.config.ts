import { type Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        poppins: "var(--font-poppins)",
        spaceGrotesk: "var(--font-space-grotesk)",
      },
    },
  },
  plugins: [],
};

export default config;
