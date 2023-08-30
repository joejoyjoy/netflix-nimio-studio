import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-5": "#17171b",
        "slate-3": "#202023",
        "slate-2": "#1d1d20",
        "gray-5": "#79797b",
        "orange-5": "#f36f45",
      },
    },
  },
  plugins: [],
};
export default config;
