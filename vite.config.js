import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sendProductsResponse } from './server/productApi.js'
import { sendCertResponse } from './server/certApi.js'

function productsApiPlugin() {
  return {
    name: 'products-api',
    configureServer(server) {
      server.middlewares.use('/api/products', (req, res, next) => {
        if (req.method !== 'GET') { next(); return }
        try {
          sendProductsResponse(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

function certApiPlugin() {
  return {
    name: 'cert-api',
    configureServer(server) {
      server.middlewares.use('/api/cert', async (req, res, next) => {
        if (req.method !== 'GET') { next(); return }
        const url = new URL(req.url || '/', 'http://localhost')
        try {
          await sendCertResponse(url.searchParams, res)
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productsApiPlugin(), certApiPlugin()],
})
