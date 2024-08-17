import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const port = process.env.VUE_APP_PORT ? parseInt(process.env.VUE_APP_PORT, 10) : 8000

export default defineConfig({
  server: {
    host: true,
    port: port
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
