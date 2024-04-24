/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orenge: "#FFD506",
        red: "#FF6868",
        secondry: "#555",
        primaryBg: "#FCFCFC",
      },
      fontFamily: {
        primary_font: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
