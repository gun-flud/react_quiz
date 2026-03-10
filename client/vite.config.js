import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // This tells Vite that '@' means the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // proxy settings from earlier will be here
  }
})