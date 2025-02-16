import path from 'node:path'
import { cpus } from 'node:os'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
    minify: false,
    sourcemap: false,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      maxParallelFileOps: Math.max(1, cpus().length - 1),
      cache: false,
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
        sourcemap: false,
        inlineDynamicImports: false,
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
  },
})
