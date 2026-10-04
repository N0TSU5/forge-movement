import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production builds (and `vite preview`) are served from GitHub Pages at /forge-movement/.
// Set BASE_PATH=/ when moving to a custom domain.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? process.env.BASE_PATH || '/forge-movement/' : '/',
  plugins: [react()],
}))
