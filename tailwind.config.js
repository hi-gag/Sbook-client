const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: 'Gugi, cursive',
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        '*': { color: theme('colors.slate.50') },
        'p': { marginBottom: '0 !important' },
      });
    }),
  ],
};
