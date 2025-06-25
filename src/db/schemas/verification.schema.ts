import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// Table
export const verification = pgTable('verification', {
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  expiresAt: timestamp('expires_at').notNull(),
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  value: text('value').notNull()
})
