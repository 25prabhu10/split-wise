import { bigint, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { group } from './group.schema'
import { user } from './user.schema'

// Table
export const groupMember = pgTable(
  'group_member',
  {
    groupId: uuid('group_id')
      .notNull()
      .references(() => group.id, { onDelete: 'cascade' }),
    id: uuid('id').defaultRandom().primaryKey(),
    joinedAt: timestamp('joined_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
  },
  (table) => [unique('unique_group_user').on(table.groupId, table.userId)]
)

// Zod Schemas
export const groupMemberInsertSchema = createInsertSchema(groupMember).omit({
  id: true,
  joinedAt: true
})

export const groupMemberSelectSchema = createSelectSchema(groupMember).omit({
  groupId: true,
  id: true,
  userId: true
})
