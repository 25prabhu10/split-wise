import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      redirect({
        search: {
          callback: location.pathname
        },
        throw: true,
        to: '/sign-in'
      })
    }
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="flex min-h-svh space-y-6 bg-background p-6 md:p-10">
      <Outlet />
    </main>
  )
}
