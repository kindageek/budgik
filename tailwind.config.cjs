/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#242961',
        secondary: '#8288C3',
        accent: '#D0BED4',
        dark: '#0B0B11',
      },
    },
  },
  plugins: [],
};
