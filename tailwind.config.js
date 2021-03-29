module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: {
        light: '#85d7ff',
        DEFAULT: '#030305',
        dark: '#009eeb',
      },
      gray: {
        DEFAULT: '#524A50',
        light: '#C1B7A9',
      },
      white: {
        DEFAULT: '#ffffff'
      },
      green: {
        DEFAULT: '#0653A3'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
