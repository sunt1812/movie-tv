/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#ff0000',
      'primary-100': '#ff00000a',
      'primary-200': '#ff000014',
      'primary-500': '#b20000',
      black: '#131313',
      'black-100': '#00000080',
      'black-200': '#0000000a',
      'black-300': '#00000099',
      'black-400': '#303030',
      'black-900': '#000000',
      white: '#ffffff',
      fern: '#66BB6A',
      gray: '#f5f5f5',
      'gray-100': '#ffffff26',
      'gray-200': '#ffffff14',
      'gray-300': '#ffffff3b',
      transparent: 'transparent',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      '2xl': '1366px',
    },
    backgroundPosition: {
      bottom: 'bottom',
      'bottom-4': 'center bottom 1rem',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'center-top': 'center top',
      'top-4': 'center top 1rem',
    },
    extend: {
      backgroundImage: {
        'hero-light':
          'linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
        'hero-dark':
          'linear-gradient(to right,rgb(245, 245, 245),rgba(0, 0, 0, 0))',
        'hero-bottom':
          'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
        'hero-bottom-dark':
          'linear-gradient(to top,rgb(245, 245, 245),rgba(0, 0, 0, 0))',
        'media-slide':
          'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));',
      },
      boxShadow: {
        menu: 'rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;',
        '3xl':
          'rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px;',
      },
    },
  },
  plugins: [],
};
