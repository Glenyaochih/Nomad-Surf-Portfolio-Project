import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/Nomad-Surf-Portfolio-Project/' : '/',
    plugins: [react()],
    // 新增 Sass 配置以解決 @import 找不到的問題
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules'],
        },
      },
    },
  };
});
