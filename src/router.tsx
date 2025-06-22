import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { NotFound } from '@/components/not-found'

import { DefaultCatchBoundary } from './components/default-error-boundary'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()
  //   {
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //       staleTime: 1000 * 60 * 2, // 2 minutes
  //     },
  //   },
  // }

  return routerWithQueryClient(
    createTanStackRouter({
      context: { queryClient, user: null },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      defaultPreload: 'intent',
      // react-query will handle data fetching & caching
      // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#passing-all-loader-events-to-an-external-cache
      defaultPreloadStaleTime: 0,
      // defaultStructuralSharing: true,
      routeTree,
      scrollRestoration: true
    }),
    queryClient
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
