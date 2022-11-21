import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "v-common-ui",
    lib: {
      entry: path.resolve(__dirname, "./src/packages/index.js"),
      name: "v-common-ui",
      fileName: "v-common-ui"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
})
