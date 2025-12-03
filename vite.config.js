import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  //判斷 ? 產品 : 開發中
  base: '/react-gh-pages/',
  plugins: [react()],
  server: {
    open: true,
  }  
})
