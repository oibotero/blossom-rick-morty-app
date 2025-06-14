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
          100: '#ede3fe',
          600: '#8253c4',
          700: '#593891',
        },
        secondary: {
          600: '#68d635',
        },
      },
    },
  },
  plugins: [],
};

