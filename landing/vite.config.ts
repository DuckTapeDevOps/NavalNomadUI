import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/NavalNomadUI/' to '/' for your domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    host: true, // This enables listening on all network interfaces
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // This helps with WSL2 file system watching
    },
  },
})
