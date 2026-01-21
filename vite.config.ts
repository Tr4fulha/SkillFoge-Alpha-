import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo atual (development/production)
  // O terceiro argumento '' permite carregar todas as variáveis, não apenas as com prefixo VITE_
  // Fix: Cast process to any because the Process type definition might be missing cwd() in this environment
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY explicitamente para ser substituído pelo valor da string durante o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
      // Mantém compatibilidade para outras variáveis se necessário, mas com cuidado
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});