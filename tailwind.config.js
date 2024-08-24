/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto, monospace',
    },
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to bottom, #D5ECF7 20%, #E0F1F9 40%, #EBF6FB 60%, #F4FAFD 100%)',
      },
    },
  },
  plugins: [],
};
