/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chill: {
          bg: '#8b9e6e',      // Sage green
          surface: '#f5f0e8', // Warm cream
          accent: '#3a2e1e',  // Dusty brown
          warning: '#d97706', // amber-600
          error: '#ef4444',   // Soft red, e.g. red-500
          fresh: '#4ade80',   // green-400
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
