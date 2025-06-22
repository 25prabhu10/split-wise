import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context }) => {
    const REDIRECT_URL = '/'
    if (context.user) {
      redirect({
        throw: true,
        to: REDIRECT_URL
      })
    }
    return {
      redirectUrl: REDIRECT_URL
    }
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <Outlet />
    </main>
  )
}
