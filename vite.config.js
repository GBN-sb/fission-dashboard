import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: true,
  }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/k8s': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/k8s/, '')
      }
    }
  }
})
