import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { SignUpForm } from '@/components/auth/sign-up-form'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <section className="w-full max-w-sm space-y-6">
      <SignUpForm />
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          className="text-primary underline underline-offset-4 hover:underline-offset-2"
          to="/sign-in">
          Sign in
        </Link>
      </div>
    </section>
  )
}
