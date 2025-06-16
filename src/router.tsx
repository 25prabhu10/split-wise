// src/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { NotFound } from '~/components/not-found'

import { DefaultCatchBoundary } from './components/default-error-boundary'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
