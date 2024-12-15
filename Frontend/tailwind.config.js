/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif','"DM Serif Text"'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
}

