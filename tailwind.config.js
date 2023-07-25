/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/Stock.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
