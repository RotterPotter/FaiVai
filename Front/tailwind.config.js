/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        black: "#010101",
        color1: "#08c873", //green
        color2: "#e5fbf4", //white ice
        color3: "#065a33", // zuccini
        color4: "#6bd8ab", // bemuda
        color5: "#6e7a83", // grey
        navbarBG: "#ffffff",
        fontColor: "#52525b",
  
      },
      width: {
        "1/7": "14.2857143%", // 100% / 7
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
