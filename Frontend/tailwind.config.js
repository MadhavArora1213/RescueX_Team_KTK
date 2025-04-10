module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emergencyRed: '#DC2626',
        safeGreen: '#10B981',
        warningYellow: '#FACC15',
        lightGray: '#F9FAFB',
        charcoalBlack: '#111827',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}