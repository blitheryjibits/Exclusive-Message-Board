/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',     // EJS templates
    './public/**/*.html',   // Static HTML files
    './src/**/*.{js,ts}',   // JS/TS files if you use them
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
