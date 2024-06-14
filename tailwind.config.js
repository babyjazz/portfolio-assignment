/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-color))',
        'black-100': 'rgb(var(--black-100-color))',
        'black-200': 'rgb(var(--black-200-color))',
        'black-300': 'rgb(var(--black-300-color))',
        'red-100': 'rgb(var(--red-100-color))',
      },
      backgroundColor: {
        theme: {
          input: 'rgb(var(--black-200-color))',
        },
      },
      borderColor: {
        theme: {
          default: 'rgb(var(--black-100-color))',
        },
      },
      textColor: {
        theme: {
          primary: 'rgb(var(--white-color))',
          'button-primary': 'rgb(var(--black-100-color))',
        },
      },
    },
  },
  plugins: [],
}
