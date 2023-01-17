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
        },
        textWhite: "#f6f5f5",
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
