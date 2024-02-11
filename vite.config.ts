import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  build: {
    target: 'esnext'
  }
})
