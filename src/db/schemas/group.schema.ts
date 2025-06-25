import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_TEXT_LENGTH } from '@/constants'

import { user } from './user.schema'

// Table
export const group = pgTable('group', {
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  createdByUserId: uuid('created_by_user_id')
    .notNull()
    .references(() => user.id),
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: MAX_TEXT_LENGTH }).notNull()
})

// Zod Schemas
export const groupInsertSchema = createInsertSchema(group, {
  name: z
    .string()
    .trim()
    .max(MAX_TEXT_LENGTH, {
      error: `Group name must be at most ${MAX_TEXT_LENGTH} characters long.`
    })
}).omit({
  createdAt: true,
  id: true
})

export const groupSelectSchema = createSelectSchema(group)
