/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#1687a7",
          secondary: "#276678",
          tertiary: "#D3E0EA60",
        },
        textWhite: "#f6f5f5",
        whiteSmoke: "#fafafa",
        textBlack: "#222831",
        grey: {
          primary: "#9d9d9d",
          secondary: "#7c7c7c",
        },
        borderGrey: "#33333333",
      },
      fontFamily: {
        fontBold: "Poppins-Bold",
        fontMedium: "Poppins-Medium",
        fontSemibold: "Poppins-Semibold",
      },
    },
  },
  plugins: [],
};
