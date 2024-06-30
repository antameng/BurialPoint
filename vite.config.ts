import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin } from 'vite'
// const plugin = (): Plugin => {
//   return {
//     name:'vite-plugin-am',
//     transform(code,id) {
//       console.log(code,'111111111');
//     }
//   }
// }
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // plugin()
  ],
  build: {
    lib: {
      entry: 'lib/index.ts',
      formats: ['es', 'cjs', 'iife', 'umd'],
      name: 'Tacker',//  给umd用的
    }
  }
})
