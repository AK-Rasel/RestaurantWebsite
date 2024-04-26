/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FFD506",
        red: "#FF6868",
        secondary: "#555",
        primaryBg: "#FCFCFC",
      },
      fontFamily: {
        primary_font: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
