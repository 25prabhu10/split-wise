import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { Header } from '@/components/header'
import { LandingContent } from '@/components/landing-content'
import { Navbar } from '@/components/navbar'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  const { user } = Route.useRouteContext()
  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleSignOut() {
    await authClient.signOut()
    await queryClient.invalidateQueries()
    await router.invalidate()
  }

  const isAuthenticated = !!user
  const userName = user?.name

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Header>
        <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} userName={userName} />
      </Header>
      <LandingContent isAuthenticated={isAuthenticated} userName={userName} />
    </div>
  )
}
