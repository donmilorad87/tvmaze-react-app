/// <reference types="vitest" />


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA as vitePwa, VitePWAOptions } from 'vite-plugin-pwa';


const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["**/*", './images/icons/favicon.ico', "./images/icons/apple-touc-icon.png", "./images/icons/masked-icon.png"],
  workbox: {
    globPatterns: ["**/*"]
  },

  // add this to cache all the
  // static assets in the public folder

  manifest: {
    theme_color: "#8866b7",
    background_color: "#5dbcdf",
    icons: [
      {
        src: "./images/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "./images/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "./images/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        src: "./images/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "./images/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        src: './apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon'
      },
      {
        src: "./images/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./mages/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "icon"
      },
      {
        src: "./images/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "./images/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'favicon'
      }
    ],
    orientation: "any",
    display: "standalone",
    lang: "en - GB",
    name: "TV Maze",
    short_name: "TV Maze",
    start_url: "http://tvmaze.blazingsun.space",
    scope: "/",
    description: "Tv Maze PWA reader",
    id: "http://blazingsun.space/tvmaze"
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), vitePwa(manifestForPlugin)],
  test: {
    globals: true,
    environment: 'jsdom',
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright'
    },
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**']
  },
  build: {
    outDir: 'dist', // Output files to the 'dist' folder
    assetsDir: 'assets' // Store assets in 'assets' directory
  },
  base: './', // Ensure relative paths for shared hosting
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }

});
