import { createServerFn, json } from '@tanstack/react-start'
import { eq, sql } from 'drizzle-orm'

import db from '@/db'
import { group, groupMember, user } from '@/db/schemas'
import { authMiddleware } from '@/services/auth/auth.service'

import {
  createGroupValidator,
  groupIdValidator,
  groupValidator,
  updateGroupValidator,
  userGroupValidator
} from './group.validators'

export const createGroup = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(createGroupValidator)
  .handler(async ({ context, data }) => {
    const newGroup = await db.transaction(async (tx) => {
      // Create the group
      const [newGroup] = await tx
        .insert(group)
        .values({
          createdByUserId: context.user.id,
          name: data.name
        })
        .returning()

      // Add the creator as a member
      await tx.insert(groupMember).values({
        groupId: newGroup.id,
        userId: context.user.id
      })
      return newGroup
    })

    return groupValidator.parse(newGroup)
  })

export const getGroupById = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(groupIdValidator)
  .handler(async ({ context, data }) => {
    const groupData = await db
      .select({
        createdAt: group.createdAt,
        createdByUserId: group.createdByUserId,
        id: group.id,
        name: group.name
      })
      .from(group)
      .where(eq(group.id, data.id))
      .limit(1)

    if (groupData.length === 0) {
      throw json({ message: 'Group not found' }, { status: 404 })
    }

    const { rows } = await db.execute<Record<'is_member', boolean>>(
      sql`SELECT EXISTS (SELECT 1 FROM ${groupMember} WHERE ${groupMember.groupId} = ${data.id} AND ${groupMember.userId} = ${context.user.id}) AS is_member`
    )

    if (rows.length === 0 || !rows[0].is_member) {
      throw json({ message: 'Access denied: You are not a member of this group' }, { status: 403 })
    }

    return groupValidator.parse(groupData[0])
  })

export const updateGroup = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(updateGroupValidator)
  .handler(async ({ context, data }) => {
    // Check if user is the creator of the group
    const groupData = await db
      .select({ createdByUserId: group.createdByUserId })
      .from(group)
      .where(eq(group.id, data.id))
      .limit(1)

    if (groupData.length === 0) {
      throw json({ message: 'Group not found' }, { status: 404 })
    }

    if (groupData[0].createdByUserId !== context.user.id) {
      throw json(
        { message: 'Access denied: Only the group creator can update the group' },
        { status: 403 }
      )
    }

    const [updatedGroup] = await db
      .update(group)
      .set({ name: data.name })
      .where(eq(group.id, data.id))
      .returning()

    return groupValidator.parse(updatedGroup)
  })

export const getUserGroups = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userGroups = await db
      .select({
        id: group.id,
        name: group.name,
        createdAt: group.createdAt,
        createdByUserId: group.createdByUserId,
        joinedAt: groupMember.joinedAt
      })
      .from(group)
      .innerJoin(groupMember, eq(group.id, groupMember.groupId))
      .where(eq(groupMember.userId, context.user.id))
      .orderBy(sql`${group.createdAt} DESC`)

    // Get member counts for each group
    const groupIds = userGroups.map((g) => g.id)
    const memberCounts = await db
      .select({
        groupId: groupMember.groupId,
        count: sql<number>`COUNT(*)::int`.as('count')
      })
      .from(groupMember)
      .where(sql`${groupMember.groupId} IN (${sql.join(groupIds, sql`, `)})`)
      .groupBy(groupMember.groupId)

    const memberCountMap = new Map(memberCounts.map((mc) => [mc.groupId.toString(), mc.count]))

    return userGroups.map((group) =>
      userGroupValidator.parse({
        ...group,
        memberCount: memberCountMap.get(group.id.toString()) ?? 0
      })
    )
  })
