/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ['"Roboto"', "sans-serif"],
      },
      colors: {
        primary: {
          light: "#27A5EE",
          DEFAULT: "#3818D9",
          dark: "#291B74",
        },
        secondary: {
          DEFAULT: "#FF5C81",
        },
        backgroundGrey: "#F8F8FA",
        grey: "#687C94",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

