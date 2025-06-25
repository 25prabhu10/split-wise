import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/groups')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <section className="container mx-auto min-h-svh space-y-6">
      <Outlet />
    </section>
  )
}
