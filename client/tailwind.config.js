/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pc: '#3b82f6',
        mobile: '#10b981',
        bgLight: '#f3f4f6'
      }
    }
  },
  plugins: [],
}
