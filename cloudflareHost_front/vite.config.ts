import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import seoPrerender from 'vite-plugin-seo-prerender';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seoPrerender({
      routes: [
        "/",
        "/about/",
        "/contact/",
        "/individual-coaching/",
        "/for-companies/",
        "/results/",
        "/privacy/",
        "/terms-of-use/",
        "/terms-of-service/"
      ],
      network: true,
      delay: 3000,
      concurrency: 4,
      removeStyle: false,
      hashHistory: false,
      publicHtml: ['/index.html'],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        injectionPoint: undefined, 
      },
      manifest: {
        name: 'ნუცა ბახტაძე — ემოციური ინტელექტის ქოუჩი',
        short_name: 'ნუცა ბახტაძე',
        description: 'სერტიფიცირებული EQ ქოუჩი საქართველოში. ინდივიდუალური ქოუჩინგი, კორპორაციული ტრენინგები.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        id: '/',
        icons: [
          { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    }),
  ],
  server: {
    open: true,
  }
});
