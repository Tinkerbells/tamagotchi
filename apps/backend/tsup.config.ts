import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/hc.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  ...options,
}))
