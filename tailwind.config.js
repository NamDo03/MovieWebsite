module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 15px 25px rgba(1,1,1,0.6)',
      },
      backgroundColor: {
        'netflix': '#141414',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

