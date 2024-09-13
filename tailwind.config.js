/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 'yellow': '#F1C40F',
        // 'gray':   '#2C3E50',
        // 'black':  '#000',
        // 'white' : '#fff',
        // 'blue' : '#100c31'
      },
    },
  },
  fontFamily: {
    poppins: ["Poppins", "sans-serif"],
  },
  plugins: [],
};
