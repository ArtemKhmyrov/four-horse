import { defineConfig } from 'vite';
import { resolve } from 'path';
import sass from 'sass-embedded';

export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        /* nested: resolve(__dirname, 'gifts.html'),  */ 
      },
      output: {
        entryFileNames: 'js/script.js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (name.endsWith('.css')) {
            return 'css/style.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});