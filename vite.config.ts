import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import ViteRadar from 'vite-plugin-radar'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// const getCache = ({ name, pattern }: any) => ({
//   urlPattern: pattern,
//   handler: 'CacheFirst' as const,
//   options: {
//     cacheName: name,
//     expiration: {
//       maxEntries: 500,
//       maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
//     },
//     cacheableResponse: {
//       statuses: [200],
//     },
//   },
// })

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    VitePWA({
      filename: 'sw.ts',
      includeAssets: ['*.svg'],
      includeManifestIcons: false,
      injectRegister: false,
      manifest: {
        name: 'YT Playlist Notifier',
        short_name: 'YT Playlist Notifier',
        description: 'Get notifications when YouTube playlists are updated.',
        theme_color: '#ced4da',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      srcDir: 'src/service-worker',
      strategies: 'injectManifest',
    }),
    // VitePWA({
    //   strategies: 'injectManifest',
    //   registerType: 'autoUpdate',
    //   mode: 'development',
    //   srcDir: 'src',
    //   filename: 'sw.ts',
    //   manifest: {
    //     name: 'PWA Router',
    //     short_name: 'PWA Router',
    //     theme_color: '#ffffff',
    //   },
    //   devOptions: {
    //     enabled: process.env.SW_DEV === 'true',
    //     /* when using generateSW the PWA plugin will switch to classic */
    //     type: 'module',
    //     navigateFallback: 'index.html',
    //   },
    // }),
    mkcert(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [
        // auto import icons
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    Icons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-N8PD5XTNXT',
      },
    }),
  ],

  server: {
    cors: true,
    https: true,
    // fs: {
    //   strict: true,
    // },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
})
