import { createFileRoute } from '@tanstack/react-router'

import { LandingContent } from '@/components/landing-content'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const { user } = Route.useRouteContext()
  const isAuthenticated = !!user
  const userName = user?.name
  return (
    <div className="min-h-svh bg-background text-foreground">
      <LandingContent isAuthenticated={isAuthenticated} userName={userName} />
    </div>
  )
}
