import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // setup 自动引入函数
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue相关的Api
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'i',
        }),
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: 'type/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    terserOptions: {
      compress: false,
      mangle: false,
    },
    minify:false,
  },
  base: './',
});
