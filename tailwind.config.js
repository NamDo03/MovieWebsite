module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 3px 10px rgba(0,0,0,0.75)',
      },
      backgroundColor: {
        'netflix': '#141414',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

