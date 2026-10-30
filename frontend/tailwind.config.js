/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c2d9eb',
          300: '#94bfe0',
          400: '#5f9ed0',
          500: '#3980c0',
          600: '#2765a4',
          700: '#1e4e83',
          800: '#1b436c',
          900: '#0f2744',
          950: '#0a192f', // Deep Sri Vidya Navy
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706', // Primary Accent Gold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(10, 25, 47, 0.12)',
        'premium-hover': '0 20px 40px -15px rgba(10, 25, 47, 0.2)',
      }
    },
  },
  plugins: [],
}

