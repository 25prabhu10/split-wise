import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schemas'

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL ?? ''
  },
  logger: true,
  schema
})

export default db
