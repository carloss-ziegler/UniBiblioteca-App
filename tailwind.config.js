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
        light: {
          blue: {
            primary: "#1687a7",
            secondary: "#276678",
            tertiary: "#D3E0EA60",
          },
          bg: "#fafafa",
          bgSoft: "#f6f5f5",
          textColor: "#222831",
          textWhite: "#f6f5f5",
          textGrayPrimary: "#7c7c7c",
          textGraySecondary: "#9d9d9d",
          borderGrey: "#33333333",
        },
        dark: {
          bg: "#222",
          bgSoft: "#252525",
          textColor: "#e5e5e5",
          textGrayPrimary: "#808080",
          textGraySecondary: "#9d9d9d",
          borderGrey: "#33333333",
        },
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
