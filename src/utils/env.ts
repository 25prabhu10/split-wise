import { z } from 'zod/v4'

const EnvSchema = z.object({
  BASE_URL: z.url(),
  DATABASE_URL: z.url(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000)
})

export type ParsedEnv = z.infer<typeof EnvSchema>

const { data: parsedEnv, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(error.issues, null, 2))
  throw new Error('Invalid environment variables')
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default parsedEnv as ParsedEnv
