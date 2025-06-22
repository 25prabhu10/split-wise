import { createServerFn, json } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { APIError } from 'better-auth/api'

import { accountLoginSchema, accountRegistrationSchema } from '@/db/schemas'
import { auth } from '@/lib/auth'

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()
  const session = await auth.api.getSession({ headers })

  return session?.user ?? null
})

export const signIn = createServerFn({ method: 'POST' })
  .validator(accountLoginSchema)
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()

    try {
      const response = await auth.api.signInUsername({
        body: {
          password: data.password,
          username: data.username
        },
        headers
      })

      if (!response) {
        throw json(
          {
            message: 'Invalid username or password.'
          },
          { status: 401 }
        )
      }

      return response.user
    } catch (error) {
      if (error instanceof APIError) {
        throw json(
          { cause: error.cause, message: error.message },
          {
            status: 500 // error.status
          }
        )
      }
      throw json(
        {
          message: 'An unexpected error occurred during sign in.'
        },
        { status: 500 }
      )
    }
  })

export const signUp = createServerFn({ method: 'POST' })
  .validator(accountRegistrationSchema)
  .handler(async ({ data }) => {
    const { headers } = getWebRequest()

    try {
      const response = await auth.api.signUpEmail({
        body: {
          displayUsername: data.username,
          email: data.email,
          name: data.name,
          password: data.password,
          username: data.username
        },
        headers
      })

      return response.user
    } catch (error) {
      console.error('Sign up error:', error)
      if (error instanceof APIError) {
        throw json(
          { cause: error.cause, message: error.message },
          {
            status: 500 // error.status
          }
        )
      }
      throw json(
        {
          message: 'An unexpected error occurred during sign up.'
        },
        { status: 500 }
      )
    }
  })
