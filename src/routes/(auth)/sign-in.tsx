import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { SignInForm } from '@/components/auth/sign-in-form'

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      redirect({ throw: true, to: '/' })
    }
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <section className="w-full max-w-sm space-y-6">
      <SignInForm />
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
