/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        img: [{ min: '440px', max: '600px' }],
      },
    },
  },
  plugins: [],
};
