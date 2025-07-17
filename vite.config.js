import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    // Disable caching during development
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    // Force reload on file changes
    watch: {
      usePolling: true,
      interval: 100
    },
    // Force HMR
    hmr: {
      overlay: true
    }
  },
  // CSS specific settings to prevent caching
  css: {
    devSourcemap: true
  },
  // Force dependency re-optimization on restart
  optimizeDeps: {
    force: true
  }
});
