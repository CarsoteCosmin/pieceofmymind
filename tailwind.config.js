module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'primary-1': {
        500: '#0B0C10',
        DEFAULT: '#0B0C10',
      },
      'primary-2': {
        500: '#1F2833',
        DEFAULT: '#1F2833',
      },
      'primary-3': {
        500: '#C5C6C7',
        DEFAULT: '#C5C6C7',
      },
      'primary-4': {
        500: '#66FCF1',
        DEFAULT: '#66FCF1',
      },
      'primary-5': {
        500: '#45A293',
        DEFAULT: '#45A293',
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
      },
      animation: {
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
