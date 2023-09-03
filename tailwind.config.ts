import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-7": "#17171b",
        "slate-5": "#1d1d20",
        "slate-3": "#202023",
        "slate-2": "#303033",
        "gray-5": "#79797b",
        "orange-5": "#f36f45",
      },
      animation: {
        bounce: "bounce 0.2s",
        mulShdSpin: "mulShdSpin 1.3s infinite linear",
      },
      boxShadow: {
        "3xl": "0 0 175px -10px #8f8f8f",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "none",
            animationTimingFunction: "linear",
          },
          "50%": {
            transform: "translateX(50%)",
            animationTimingFunction: "linear",
          },
        },
        mulShdSpin: {
          "0%, 100%": {
            boxShadow:
              "0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0",
          },
          "12.5%": {
            boxShadow:
              "0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em",
          },
          "25%": {
            boxShadow:
              "0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em",
          },
          "37.5%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em",
          },
          "50%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em",
          },
          "62.5%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em",
          },
          "75%": {
            boxShadow:
              "0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0",
          },
          "87.5%": {
            boxShadow:
              "0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em",
          },
        },
      },
    },
    screens: {
      tablet: "520px",
      // => @media (min-width: 520px) { ... }

      laptop: "830px",
      // => @media (min-width: 830px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }

      xl: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      lg: { max: "750px" },
      // => @media (max-width: 750px) { ... }

      md: { max: "600px" },
      // => @media (max-width: 600px) { ... }

      sm: { max: "550px" },
      // => @media (max-width: 550px) { ... }

      xs: { max: "450px" },
      // => @media (max-width: 450px) { ... }
    },
  },
  plugins: [],
};
export default config;
