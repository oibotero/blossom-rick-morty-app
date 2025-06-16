// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-0.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      screens: {
        xs: "480px",
      },
      colors: {
        primary: {
          100: '#EEE3FF',
          600: '#8054C7',
          700: '#5A3696',
        },
        secondary: {
          600: '#63D838',
        },
      },
    },
  },
  plugins: [],
};

