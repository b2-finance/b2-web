/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env', '');
  return {
    plugins: [react()],
    envDir: 'env',
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      mockReset: true,
      restoreMocks: true,
    },
  };
});
