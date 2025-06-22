import { z } from 'zod/v4'

export const UserMetaSchema = z.object({
  username: z.string().min(3).max(20)
})

export type UserMeta = z.infer<typeof UserMetaSchema>

export const SignUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.email(),
    name: z.string().min(3).max(50),
    password: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type SignUpSchema = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string()
})

export type SignInSchema = z.infer<typeof SignInSchema>
