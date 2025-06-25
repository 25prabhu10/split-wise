import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      redirect({
        throw: true,
        to: '/'
      })
    }

    console.log('Redirecting to auth route:', location)
    return {
      redirectUrl: location
    }
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="flex min-h-svh flex-col items-center space-y-6 bg-background p-6 md:p-10">
      <Outlet />
    </main>
  )
}
