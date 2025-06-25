import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod/v4'

import { SignInForm } from '@/components/auth/sign-in-form'

const signInSearchSchema = z.object({
  callback: z.string().optional()
})

export const Route = createFileRoute('/(auth)/sign-in')({
  component: RouteComponent,
  validateSearch: signInSearchSchema
})

function RouteComponent() {
  const { callback } = Route.useSearch()

  return (
    <section className="w-full max-w-sm space-y-6">
      <SignInForm callback={callback} />
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          className="text-primary underline underline-offset-4 hover:underline-offset-2"
          to="/sign-up">
          Sign up
        </Link>
      </div>
    </section>
  )
}
