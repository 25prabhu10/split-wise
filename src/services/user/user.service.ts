import { createServerFn } from '@tanstack/react-start'
import { ne } from 'drizzle-orm'

import db from '@/db'
import { user } from '@/db/schemas'
import { authMiddleware } from '@/services/auth/auth.service'

export const getAvailableUsers = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return await db
      .select({
        displayUsername: user.displayUsername,
        email: user.email,
        id: user.id,
        image: user.image,
        name: user.name,
        username: user.username
      })
      .from(user)
      .where(ne(user.id, context.user.id))
  })
