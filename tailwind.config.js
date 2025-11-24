/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 7 Brew Brand Colors
        maroon: {
          DEFAULT: '#722F37',
          dark: '#5a252c',
          light: '#8a3a43',
        },
        navy: {
          DEFAULT: '#1B365D',
          dark: '#152949',
          light: '#2d4a7c',
        },
        cream: {
          DEFAULT: '#FDF6E3',
          dark: '#f5edd3',
        },
        blue: {
          light: '#E8F4F8',
          neon: '#00D9FF',
        },
      },
      fontFamily: {
        script: ['Pacifico', 'cursive'],
        heading: ['Bebas Neue', 'Oswald', 'sans-serif'],
        body: ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
        'bounce-subtle': 'bounceSubtle 0.5s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
