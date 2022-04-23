module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary-1': {
        500: '#0C0032',
        DEFAULT: '#0C0032',
      },
      'primary-2': {
        500: '#190061',
        DEFAULT: '#190061',
      },
      'primary-3': {
        500: '#240090',
        DEFAULT: '#240090',
      },
      'primary-4': {
        500: '#3500D3',
        DEFAULT: '#3500D3',
      },
      'primary-5': {
        500: '#282828',
        DEFAULT: '#282828',
      },
      white: '#FFFFFF',
      black: '#000000',
      light: '#FFFFFF',
      dark: '#323B4B',
    },
    extend: {
      inset: {
        '2/10': '20%',
        '4/10': '40%',
        '6/10': '60%',
        '8/10': '80%',
      },
      translate: {
        '2/10': '20%',
        '4/10': '40%',
        '6/10': '60%',
        '8/10': '80%',
      },
      keyframes: {
        fadeInTop: {
          '0%': {
            transform: 'translatey(100px)',
            opacity: '0',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translatey(0px)',
            opacity: '1',
            visibility: 'visible',
          },
        },
        fadeInRight: {
          '0%': {
            transform: 'translatex(-100px)',
            opacity: '0',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translatex(0px)',
            opacity: '1',
            visibility: 'visible',
          },
        },
        fadeInBottom: {
          '0%': {
            transform: 'translatey(-100px)',
            opacity: '0',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translatey(0px)',
            opacity: '1',
            visibility: 'visible',
          },
        },
        fadeOutTop: {
          '0%': {
            transform: 'translatey(0px)',
            opacity: '1',
            visibility: 'visible',
          },
          '100%': {
            transform: 'translatey(100px)',
            opacity: '0',
            visibility: 'hidden',
          },
        },
        fadeOutRight: {
          '0%': {
            transform: 'translatex(0px)',
            opacity: '1',
            visibility: 'visible',
          },
          '100%': {
            transform: 'translatex(-100px)',
            opacity: '0',
            visibility: 'hidden',
          },
        },
        fadeOutBottom: {
          '0%': {
            transform: 'translatey(0px)',
            opacity: '1',
            visibility: 'visible',
          },
          '100%': {
            transform: 'translatey(-100px)',
            opacity: '0',
            visibility: 'hidden',
          },
        },
        dotsBounce: {
          '0%, 100%': {
            transform: 'translatey(-5px)',
          },
          '50%': {
            transform: 'translatey(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s',
        fadeInTop: 'fadeInTop 0.3s ease-in-out forwards',
        fadeInRight: 'fadeInRight 0.3s ease-in-out forwards',
        fadeInBottom: 'fadeInBottom 0.3s ease-in-out forwards',
        fadeOutTop: 'fadeOutTop 0.3s ease-in-out forwards',
        fadeOutRight: 'fadeOutRight 0.3s ease-in-out forwards',
        fadeOutBottom: 'fadeOutBottom 0.3s ease-in-out forwards',
        dotsBounce: 'dotsBounce 0.8s infinite',
      },
    },
  },
  plugins: [],
};
