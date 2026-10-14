import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Builds for the domain root by default (Cloudflare, most hosts).
// GitHub Pages serves from a subfolder, so `npm run deploy` sets BASE_PATH=/forge-movement/.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? process.env.BASE_PATH || '/' : '/',
  plugins: [react()],
}))
