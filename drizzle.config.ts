import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ''
  },
  dialect: 'postgresql',
  out: './src/db/migrations',
  schema: './src/db/schemas',
  strict: true,
  verbose: true
})
