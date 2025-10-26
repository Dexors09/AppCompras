import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/AppCompras/', // 👈 nombre exacto de tu repo con slashes
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'App de Compras',
        short_name: 'Compras',
        description: 'App para registrar tus compras',
        theme_color: '#0d6efd',
        background_color: '#121212',
        display: 'standalone',
        start_url: '/AppCompras/', // 👈 muy importante
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  build:{
    outDir: "docs"
  },
});
