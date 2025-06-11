/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#222222",
        tertiary: "#080808",
        rating: "#ffb703",
      },
      fontFamily: {
        ubuntu: ["Ubuntu", ...defaultTheme.fontFamily.sans],
        playwrite: ["Playwrite GB S", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
