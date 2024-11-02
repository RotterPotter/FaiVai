/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./index.html"],
  theme: {
    extend: {
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
