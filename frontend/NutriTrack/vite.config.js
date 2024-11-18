import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()], // Add basicSsl plugin
  base: './',
  server: {
    https: true, // Optional: Set the port
    host: true, // Allow access on the local network
  },
});
