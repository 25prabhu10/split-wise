import { sql } from 'drizzle-orm'
import {
  bigint,
  bigserial,
  check,
  index,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

import { MAX_AMOUNT, MAX_TEXT_LENGTH, PRECISION, SCALE } from '@/constants'

import { expense } from './expense.schema'
import { group } from './group.schema'
import { user } from './user.schema'

export const statusEnum = pgEnum('status', ['paid', 'unpaid'])

// Table
export const transaction = pgTable(
  'transaction',
  {
    amount: numeric('amount', { precision: PRECISION, scale: SCALE }).notNull(),
    createdAt: timestamp('created_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => user.id),
    description: varchar('description', { length: MAX_TEXT_LENGTH }),
    expenseId: uuid('expense_id').references(() => expense.id, {
      onDelete: 'cascade'
    }),
    groupId: uuid('group_id').references(() => group.id, {
      onDelete: 'set null'
    }),
    id: uuid('id').defaultRandom().primaryKey(),
    payerUserId: uuid('payer_user_id')
      .notNull()
      .references(() => user.id),
    receiverUserId: uuid('receiver_user_id')
      .notNull()
      .references(() => user.id),
    settledDate: timestamp('settled_date'),
    status: statusEnum(),
    transactionDate: timestamp('transaction_date')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedBy: uuid('updated_by')
      .notNull()
      .references(() => user.id)
  },
  (table) => [
    check('check_amount_positive', sql`${table.amount} > 0`),
    check('check_different_users', sql`${table.payerUserId} <> ${table.receiverUserId}`),
    check('check_status_valid', sql`${table.status} IN ('unpaid', 'paid')`),
    check(
      'check_settled_date_when_paid',
      sql`
        (${table.status} = 'paid' AND ${table.settledDate} IS NOT NULL) OR 
        (${table.status} = 'unpaid' AND ${table.settledDate} IS NULL)
      `
    ),
    index('idx_transactions_payer').on(table.payerUserId),
    index('idx_transactions_receiver').on(table.receiverUserId),
    index('idx_transactions_expense').on(table.expenseId),
    index('idx_transactions_group').on(table.groupId),
    index('idx_transactions_status').on(table.status)
  ]
)

// Zod Schemas
export const transactionInsertSchema = createInsertSchema(transaction, {
  amount: z.coerce
    .number()
    .positive('Amount must be a positive number')
    .max(MAX_AMOUNT, `Amount must be at most ${MAX_AMOUNT}`),
  description: z
    .string()
    .trim()
    .max(MAX_TEXT_LENGTH, `Description must be at most ${MAX_TEXT_LENGTH} characters long`)
    .optional()
})
  .omit({
    createdAt: true,
    id: true,
    settledDate: true,
    transactionDate: true,
    updatedAt: true
  })
  .refine((data) => data.payerUserId !== data.receiverUserId, {
    message: 'Payer and receiver must be different users',
    path: ['receiverUserId']
  })

export const transactionUpdateSchema = createInsertSchema(transaction, {
  amount: z.coerce
    .number()
    .positive('Amount must be a positive number')
    .max(MAX_AMOUNT, `Amount must be at most ${MAX_AMOUNT}`),
  description: z
    .string()
    .max(MAX_TEXT_LENGTH, `Description must be at most ${MAX_TEXT_LENGTH} characters long`)
    .optional()
})
  .omit({
    createdAt: true,
    createdBy: true,
    id: true,
    transactionDate: true
  })
  .partial()
  .refine(
    (data) => !data.payerUserId || !data.receiverUserId || data.payerUserId !== data.receiverUserId,
    {
      message: 'Payer and receiver must be different users',
      path: ['receiverUserId']
    }
  )
