import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const port = Number.isInteger(Number(process.env.VUE_APP_PORT)) ? Number(process.env.VUE_APP_PORT) : 3000;

export default defineConfig({
  server: {
    port: port,
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
