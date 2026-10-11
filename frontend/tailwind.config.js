import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        radar: {
          dark: '#050811',
          surface: '#0b1120',
          card: '#0f172a',
          clay: '#141f36',
          border: '#1e293b',
          lightBg: '#f8fafc',
          lightSurface: '#ffffff',
          lightCard: '#ffffff',
          lightClay: '#f1f5f9',
          lightBorder: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', 'html.light &');
    })
  ],
}
