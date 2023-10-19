import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr()],
    publicDir: './public',
    envDir: '/src',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    define: {
      __API__: JSON.stringify('http://localhost:8000'),
      __IS_DEV__: JSON.stringify(true),
      __PROJECT__: JSON.stringify('frontend'),
    },
  });
};
