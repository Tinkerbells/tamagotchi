import scrollbarHide from 'tailwind-scrollbar-hide'
import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        primary: 'hsla(22, 47%, 53%, 1)',
        secondary: 'hsla(28, 90%, 88%, 1)',
        gray: '#818C99',
      },
      boxShadow: {
        'start-screen-card': '0px 8px 46.8px -13px #13518F',
      },
    },
    plugins: [scrollbarHide],
  },
}

export default config
