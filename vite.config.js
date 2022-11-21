import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "vc-common-ui",
    lib: {
      entry: path.resolve(__dirname, "./src/packages/index.js"),
      name: "vc-common-ui",
      fileName: "vc-common-ui"
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
