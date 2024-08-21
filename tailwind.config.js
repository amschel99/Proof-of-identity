/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/frontend/src/**/*.{html,js}",
    "./src/frontend/src/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost"', 'sans-serif'],
        leagueSpartan: ['"League Spartan"', 'sans-serif'],
        jockeyOne: ['"Jockey One"', 'sans-serif'],
      },
      colors: {
        primary: '#ffffff',
        secondary: 'rgba(228, 255, 151, 0.2)',
        text: {
          primary: '#000000',
          secondary: '#7f7f7f',
        },
        darkdefault: '#222222',
        divider: 'rgba(127, 127, 127, 0.25)',
        success: 'rgba(18, 163, 58, 0.7)',
        bluee: '#006ad4',
        danger: 'rgba(188, 0, 68, 0.7)',
        dark: '#141414',
      },
      backgroundImage: {
        'primary-gradient-one': 'linear-gradient(0deg, rgba(0, 60, 50, 0.9) 0%, rgba(0, 120, 100, 0.8) 100%)',
        'primary-gradient-two': 'linear-gradient(360deg, rgba(0, 30, 25, 0.9) 0%, rgba(20, 50, 40, 0.8) 100%)',
        'primary-gradient-three': 'linear-gradient(180deg, #004d40 0%, #00251a 100%)',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
