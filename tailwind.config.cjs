/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#5869C5",
          default: "#3F51B5",
          dark: "#313E8B",
          50: "#C2C8EA",
          100: "#B3BAE4",
          200: "#949FDA",
          300: "#7684CF",
          400: "#5869C5",
          500: "#3F51B5",
          600: "#313E8B",
          700: "#222C62",
          800: "#141938",
          900: "#05070F",
        },
        secondary: {
          light: "#38bdf8",
          default: "#0ea5e9",
          dark: "#0284c7",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
