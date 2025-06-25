import { useQuery } from '@tanstack/react-query'
import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { authQueries } from '@/services/auth/auth.queries'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  plugins: [usernameClient()]
})

export const useAuthentication = () => {
  const { data: user } = useQuery(authQueries.getUser())

  return { isAuthenticated: !!user, user }
}

export const useAuthenticatedUser = () => {
  const { user } = useAuthentication()

  if (!user) {
    throw new Error('User is not authenticated!')
  }

  return user
}
