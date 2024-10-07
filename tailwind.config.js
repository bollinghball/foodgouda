/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif' ],
      },
      colors: {
        // Configure your color palette here
        'fgBlue': '#19353b',
        'fgYellow': '#fdba02',
        'fgLiteBlue': '#195B94',
      },
    },
  },
  plugins: [],
}

