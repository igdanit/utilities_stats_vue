import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 5173,
    proxy: {
      '^/api/.*': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api\/v1/, '')
      }
    },
  }
})
