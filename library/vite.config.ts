import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import dts from 'vite-plugin-dts';
const { name } = JSON.parse(readFileSync('package.json', 'utf-8'));
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue-demi'],
    }),
    Components({
      dirs: ['src/components', '/packages'],
    }),
    dts({
      exclude:['docs/**','src/**','dist/**','node_modules/**']
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/main.ts'),
      name,
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'index[extname]',
      },
    },
  },
});
