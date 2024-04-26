/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html","./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/whatsapp-bg.png')"
      }
    },
  },
  plugins: [],
}