import { z } from 'zod/v4'

import {
  groupInsertSchema,
  groupMemberSelectSchema,
  groupSelectSchema,
  userSelectSchema
} from '@/db/schemas'

export const createGroupValidator = z.object({
  name: groupInsertSchema.shape.name
})

export const groupIdValidator = z.object({
  id: groupSelectSchema.shape.id
})

export const groupValidator = z.object({
  ...groupSelectSchema.shape
})

export type Group = z.infer<typeof groupValidator>

export const groupMemberSchema = z.object({
  id: userSelectSchema.shape.id,
  joinedAt: groupMemberSelectSchema.shape.joinedAt,
  name: userSelectSchema.shape.name,
  username: userSelectSchema.shape.username
})

export const updateGroupValidator = z.object({
  id: groupSelectSchema.shape.id,
  name: groupInsertSchema.shape.name
})

export const userGroupValidator = groupValidator.extend({
  joinedAt: groupMemberSelectSchema.shape.joinedAt,
  memberCount: z.number()
})

export type UserGroup = z.infer<typeof userGroupValidator>
