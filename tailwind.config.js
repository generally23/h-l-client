/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
