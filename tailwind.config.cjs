/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  mode: 'jit',
  content: ['./resources/**/*.{js,jsx,ts,tsx,edge}'],
  darkMode: 'class', // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addVariant }) {
      addVariant('hidden', '.hidden &')
    },
  ],
}
