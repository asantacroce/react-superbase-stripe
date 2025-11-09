/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'troy-yellow': '#facc15',
        'troy-dark': '#0f172a',
      },
    },
  },
  plugins: [],
}
