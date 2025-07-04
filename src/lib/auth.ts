import { serverOnly } from '@tanstack/react-start'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'

import db from '@/db'

const getAuthConfig = serverOnly(() =>
  betterAuth({
    advanced: {
      database: {
        generateId: false // Disable ID generation by better-auth
      }
    },

    database: drizzleAdapter(db, {
      provider: 'pg'
    }),

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    // session: {
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 5 * 60, // 5 minutes
    //   },
    // },

    emailAndPassword: {
      enabled: true
    },

    // https://www.better-auth.com/docs/concepts/oauth
    // socialProviders: {
    //   github: {
    //     clientId: process.env.GITHUB_CLIENT_ID!,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET!
    //   }
    // }
    plugins: [username(), reactStartCookies()]
  })
)

export const auth = getAuthConfig()
