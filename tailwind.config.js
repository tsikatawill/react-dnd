/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
        "primary-dark-hover": "",
        primary: "#22c55e",
        "primary-hover": "#009e3a",
        "primary-light": "",
        "secondary-dark": "#160016",
        "secondary-light": "#a855f7",
        "transparent-dark": "rgba(0, 0, 0, 0.25)",
        "transparent-light": "rgba(255, 255, 255, 0.25)",
        "secondary-dark-hover": "#16001651",
        "secondary-light-hover": "#a955f761",
        gray: "#8492a6",
      },
    },
  },
  plugins: [],
};
