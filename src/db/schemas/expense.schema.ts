import { sql } from 'drizzle-orm'
import { check, date, index, numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_AMOUNT, MAX_DATE, MAX_TEXT_LENGTH, MIN_DATE, PRECISION, SCALE } from '@/constants'

import { group } from './group.schema'
import { user } from './user.schema'

// Table
export const expense = pgTable(
  'expense',
  {
    amount: numeric('amount', { precision: PRECISION, scale: SCALE }).notNull(),
    createdAt: timestamp('created_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    description: varchar('description', { length: MAX_TEXT_LENGTH }).notNull(),
    groupId: uuid('group_id')
      .notNull()
      .references(() => group.id, { onDelete: 'cascade' }),
    id: uuid('id').defaultRandom().primaryKey(),
    incurredAt: date('incurred_at').notNull(),
    paidByUserId: uuid('paid_by_user_id')
      .notNull()
      .references(() => user.id)
  },
  (table) => [
    index('idx_expenses_group_id').on(table.groupId),
    check('check_amount_positive', sql`${table.amount} > 0`)
  ]
)

// Zod Schemas
export const expenseInsertSchema = createInsertSchema(expense, {
  amount: z.coerce
    .number()
    .positive('Amount must be a positive number')
    .max(MAX_AMOUNT, `Amount must be at most ${MAX_AMOUNT}`),
  description: z
    .string()
    .trim()
    .max(MAX_TEXT_LENGTH, `Description must be at most ${MAX_TEXT_LENGTH} characters long`),
  incurredAt: z
    .date('Invalid date format')
    .min(MIN_DATE, `Incurred date must be after ${MIN_DATE.toISOString()}`)
    .max(MAX_DATE, `Incurred date must be before ${MAX_DATE.toISOString()}`)
}).omit({
  createdAt: true,
  id: true
})
