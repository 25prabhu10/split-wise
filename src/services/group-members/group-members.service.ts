import db from '@/db'
import { user, groupMember } from '@/db/schemas'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { authMiddleware } from '../auth/auth.service'
import { groupIdValidator, groupMemberSchema } from '../group/group.validators'

export const getGroupMembersByGroupId = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(groupIdValidator)
  .handler(async ({ data }) => {
    const members = await db
      .select({
        id: user.id,
        joinedAt: groupMember.joinedAt,
        name: user.name,
        username: user.username
      })
      .from(groupMember)
      .innerJoin(user, eq(groupMember.userId, user.id))
      .where(eq(groupMember.groupId, data.id))

    return members.map((member) => groupMemberSchema.parse(member))
  })
