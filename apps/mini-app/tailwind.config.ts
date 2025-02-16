import type { Config } from 'tailwindcss'

import scrollbarHide from 'tailwind-scrollbar-hide'
import sharedConfig from '@tamagotchi/tailwind-config'

const config: Pick<Config, 'content' | 'presets' | 'theme' | 'plugins'> = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'bubble-message': `
          inset 0 -5px 7px -3px #fff,
          inset 0 1px 1px 0 #fff,
          inset 0 -7px 41px 8px rgba(208, 100, 57, 0.24),
          inset 0 -6px 12px -1px rgba(207, 87, 36, 0.35),
          0 13px 48px -10px rgba(196, 100, 59, 0.55)
        `,
        'item-border':
          '`0 2px 24px 0 rgba(0, 0, 0, 0.08), 0 0 2px 0 rgba(0, 0, 0, 0.08)`',
        'profile-card': '0 20px 24px 0 rgba(233, 192, 179, 0.2)',
        'achievement': `0 2px 24px 0 rgba(0, 0, 0, 0.08), 0 0 2px 0 rgba(0, 0, 0, 0.08)`,
        'gratitude-message': '0 28px 45px 0 rgba(212, 167, 122, 0.24)',
      },
      backgroundImage: {
        main: 'linear-gradient(#ffffff, #ffffff), linear-gradient(#f2f3f5, #f2f3f5)',
        water: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%)',
      },
      colors: {
        'background': {
          primary: '#fff',
          secondary: '#f2f3f5',
        },
        'custom-border': 'rgba(0, 0, 0, 0.08)',
        'text': {
          secondary: '#818c99',
          highlight: '#d48971',
        },
      },
      fontFamily: {
        vk: ['VKSansDisplay', 'sans-serif'],
      },
    },
  },
  presets: [sharedConfig],
  plugins: [scrollbarHide, require('tailwindcss-animate')],
}

export default config
