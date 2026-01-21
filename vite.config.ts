
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Garante compatibilidade caso alguma lib tente acessar process.env.NODE_ENV
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
