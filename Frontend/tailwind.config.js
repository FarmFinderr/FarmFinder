/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
}

