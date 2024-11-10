import sharedConfig from '@tamagotchi/tailwind-config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vk: ['VKSansDisplay', 'sans-serif'],
      },
    },
  },
  presets: [sharedConfig],
}

export default config
