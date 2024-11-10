import sharedConfig from '@tamagotchi/tailwind-config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets'> = {
  presets: [sharedConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
}

export default config
