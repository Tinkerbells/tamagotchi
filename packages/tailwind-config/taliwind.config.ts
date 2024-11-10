import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      backgroundImage: {
        main: 'linear-gradient(#ffffff, #ffffff), linear-gradient(#f2f3f5, #f2f3f5)',
      },
      colors: {
        primary: 'hsla(22, 47%, 53%, 1)',
        secondary: 'hsla(28, 90%, 88%, 1)',
        gray: '#818C99',
      },
      boxShadow: {
        'start-screen-card': '0px 8px 46.8px -13px #13518F',
      },
    },
    plugins: [],
  },
}

export default config
