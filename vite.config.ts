import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import crypto from 'node:crypto'

const cspNonce = crypto.randomBytes(16).toString('base64')

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'nonce-${cspNonce}'`,
  `style-src 'self' 'unsafe-inline' 'nonce-${cspNonce}'`,
  "img-src 'self' data: blob: https://image.tmdb.org https://images.unsplash.com https://i.ytimg.com",
  "font-src 'self' data:",
  "connect-src 'self' ws://localhost:3000 http://localhost:3000 ws://127.0.0.1:3000 http://127.0.0.1:3000 http://localhost:3001 https://api.themoviedb.org",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
]

const cspHeader = cspDirectives.join('; ')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  html: {
    cspNonce,
  },
  server: {
    port: 3000,
    strictPort: true,
    headers: {
      'Content-Security-Policy': cspHeader,
    },
  },
  preview: {
    port: 3000,
    headers: {
      'Content-Security-Policy': cspHeader,
    },
  },
})
