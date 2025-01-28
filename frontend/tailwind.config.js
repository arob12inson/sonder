/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#064e3b', 
        'light-green': '#10b981',
        'dark-grey': '#1f2937', 
      },
    },
  },
  plugins: [],
}
