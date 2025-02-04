import { hideControls, setControlsTypes } from '@storybook/controls'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code, id) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '')
      }
      return { code }
    },
  }
}

/**
 * Some chunks may be large.
 * This will not affect the loading speed of the site.
 * We collect several versions of scripts that are applied depending on the browser version.
 * This is done so that your code runs equally well on the site and in the odr.
 * The details are here: https://dev.vk.com/mini-apps/development/on-demand-resources.
 */
export default defineConfig({
  base: './',

  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    tsconfigPaths(),
    ViteImageOptimizer(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },

  build: {
    outDir: 'build',
  },
})
