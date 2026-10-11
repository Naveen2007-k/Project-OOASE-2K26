/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f5',
          100: '#ffe4ed',
          200: '#fecddc',
          300: '#fda4c1',
          400: '#fb719f',
          500: '#f43f7a',
          600: '#e11d61',
          700: '#be124d',
          800: '#9d1243',
          900: '#83143c',
          950: '#4c051e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
