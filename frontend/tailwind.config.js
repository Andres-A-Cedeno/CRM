const { title } = require("process");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        fontsColors: {
          small: "#9095A0",
          title: "#171A1F",
        },
        backgrounds: {
          inputBg: "#BCC1CA",
          buttonBg: "#3394F5",
          buttonHoverBg: "#1F7DEE",
          bgScreen: "#F8F9FA",
          bgCard: "#FFFFFF",
        },
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"], // Solo Montserrat
      body: ["Montserrat", "sans-serif"],
    },
  },
};
