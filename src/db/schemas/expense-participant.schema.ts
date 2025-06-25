import { sql } from 'drizzle-orm'
import { check, numeric, pgTable, unique, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_AMOUNT, PRECISION, SCALE } from '@/constants'

import { expense } from './expense.schema'
import { user } from './user.schema'

// Table
export const expenseParticipant = pgTable(
  'expense_participant',
  {
    expenseId: uuid('expense_id')
      .notNull()
      .references(() => expense.id, { onDelete: 'cascade' }),
    id: uuid('id').defaultRandom().primaryKey(),
    shareAmount: numeric('share_amount', { precision: PRECISION, scale: SCALE }).notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
  },
  (table) => [
    unique('unique_expense_user').on(table.expenseId, table.userId),
    check('check_share_amount_non_negative', sql`${table.shareAmount} >= 0`)
  ]
)

// Zod Schemas
export const expenseParticipantsInsertSchema = createInsertSchema(expenseParticipant, {
  shareAmount: z.coerce
    .number()
    .positive('Share amount must be a positive number')
    .max(MAX_AMOUNT, `Share amount must be at most ${MAX_AMOUNT}`)
}).omit({
  id: true
})
