import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: './',

  plugins: [
    react(),
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
      '@public': path.resolve(__dirname, './public'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },

  build: {
    outDir: 'build',
    rollupOptions: {
      maxParallelFileOps: 2,
      cache: false,
      external: ['react', 'react-dom'],
      manualChunks: (id) => {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      },
      sourcemapIgnoreList: (relativeSourcePath) => {
        const normalizedPath = path.normalize(relativeSourcePath)
        return normalizedPath.includes('node_modules')
      },
    },
  },
})
