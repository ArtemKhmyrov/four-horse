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
       /*  gifts: resolve(__dirname, 'gifts.html'), */
      },
      output: {
        entryFileNames: 'js/[name].js', // Уникальные файлы для каждой точки входа
        chunkFileNames: 'js/[name]-[hash].js', // Общие чанки
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'css/style.css'; // Все CSS объединяются в один файл
          }
          return 'assets/[name]-[hash][extname]'; // Для остальных ассетов
        },
      },
    },
  },
});