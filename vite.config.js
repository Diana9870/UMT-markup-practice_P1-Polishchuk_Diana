import { defineConfig } from 'vite';

export default defineConfig({
  base: '/UMT-markup-practice_P1-Polishchuk_Diana/',

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
    open: true,
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  },
});