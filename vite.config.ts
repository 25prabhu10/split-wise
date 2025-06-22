import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tanstackStart({
      // Enable React compiler for TanStack Start (https://react.dev/learn/react-compiler)
      react: {
        babel: {
          plugins: [
            [
              'babel-plugin-react-compiler',
              {
                target: '19'
              }
            ]
          ]
        }
      },

      tsr: {
        quoteStyle: 'double',
        semicolons: true
        // verboseFileRoutes: false,
      }

      // https://tanstack.com/start/latest/docs/framework/react/hosting#deployment
      // target: "node-server",
    }),
    tailwindcss()
  ],
  server: {
    port: 3000
  }
})
