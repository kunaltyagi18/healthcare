import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sendProductsResponse } from './server/productApi.js'

function productsApiPlugin() {
  return {
    name: 'products-api',
    configureServer(server) {
      server.middlewares.use('/api/products', (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        try {
          sendProductsResponse(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productsApiPlugin()],
})
