import { MutationCache, QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { toast } from 'sonner'
import { ZodError } from 'zod/v4'

import { NotFound } from '@/components/not-found'

import { DefaultCatchBoundary } from './components/default-error-boundary'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        staleTime: 1000 * 60 * 5 // 2 minutes
      }
    },
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        if (error instanceof Error) {
          const zodError = parseZodError(error)
          if (zodError) {
            toast.error(zodError)
            return
          }
          toast.error(error.message)
        } else if (typeof error === 'string') {
          toast.error(error)
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
          toast.error((error as { message: string }).message)
        }
      }
    })
  })

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

function parseZodError(error: Error) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const zodError = new ZodError(JSON.parse(error.message))

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (zodError) {
      let message = 'Error: '

      for (const issue of zodError.issues) {
        message += `${issue.path.join('.')} - ${issue.message}. \n`
      }

      return message
    }

    return null
  } catch {
    console.error('Failed to parse Zod error:', error)
  }
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
