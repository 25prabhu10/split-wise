import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { user } from './user.schema'

// Table
export const session = pgTable('session', {
  createdAt: timestamp('created_at').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  id: uuid('id').defaultRandom().primaryKey(),
  ipAddress: text('ip_address'),
  token: text('token').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull(),
  userAgent: text('user_agent'),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
})
