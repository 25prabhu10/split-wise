import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schemas'

const db = drizzle({
  connection: {
    connectionString: import.meta.env.DATABASE_URL as string
  },
  logger: true,
  schema
})

export default db
