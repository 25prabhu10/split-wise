import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_TEXT_LENGTH } from '@/constants'

import { user, userInsertSchema } from './user.schema'

// Table
export const account = pgTable('account', {
  accessToken: text('access_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  accountId: text('account_id').notNull(),
  createdAt: timestamp('created_at').notNull(),
  id: uuid('id').defaultRandom().primaryKey(),
  idToken: text('id_token'),
  password: varchar('password', { length: MAX_TEXT_LENGTH }),
  providerId: text('provider_id').notNull(),
  refreshToken: text('refresh_token'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  updatedAt: timestamp('updated_at').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
})

// Zod Schemas
const accountInsertSchema = createInsertSchema(account, {
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(MAX_TEXT_LENGTH, `Password must be at most ${MAX_TEXT_LENGTH} characters long`)
}).pick({
  password: true
})

export const accountLoginSchema = z.object({
  password: accountInsertSchema.shape.password,
  username: userInsertSchema.shape.username.unwrap()
})

export type AccountLogin = z.input<typeof accountLoginSchema>

export const accountRegistrationSchema = z
  .object({
    confirmPassword: accountLoginSchema.shape.password,
    email: userInsertSchema.shape.email,
    name: userInsertSchema.shape.name,
    password: accountLoginSchema.shape.password,
    username: userInsertSchema.shape.username
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type AccountRegistration = z.input<typeof accountRegistrationSchema>
