import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2020',
    minify: true,

    lib: {
      name: 'ColorProcessor',
      entry: 'src/main.ts',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `color-processor.${format}.js`,
    },

    rollupOptions: {
      output: {
        globals: {
          'color-processor': 'ColorProcessor',
        },
      },
    },
  },
});
