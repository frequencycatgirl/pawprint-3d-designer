import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pawprint-3d-designer/',   // Important: use your repo name here
})
