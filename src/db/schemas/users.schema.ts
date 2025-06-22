import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_TEXT_LENGTH } from '@/constants/table.constants'

export const user = pgTable('user', {
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  displayUsername: varchar('display_username', { length: MAX_TEXT_LENGTH }),
  email: varchar('email', { length: MAX_TEXT_LENGTH }).notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  id: text('id').primaryKey(),
  image: text('image'),
  name: varchar('name', { length: MAX_TEXT_LENGTH }).notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: varchar('username', { length: MAX_TEXT_LENGTH }).unique()
})

export const userInsertSchema = createInsertSchema(user, {
  displayUsername: (schema) =>
    schema
      .trim()
      .max(MAX_TEXT_LENGTH, `Display username must be at most ${MAX_TEXT_LENGTH} characters long`),
  email: z.email().max(MAX_TEXT_LENGTH, `Email must be at most ${MAX_TEXT_LENGTH} characters long`),
  name: (schema) =>
    schema.trim().max(MAX_TEXT_LENGTH, `Name must be at most ${MAX_TEXT_LENGTH} characters long`),
  username: (schema) =>
    schema
      .trim()
      .max(MAX_TEXT_LENGTH, `Username must be at most ${MAX_TEXT_LENGTH} characters long`)
}).omit({
  createdAt: true,
  emailVerified: true,
  id: true,
  image: true,
  updatedAt: true
})
