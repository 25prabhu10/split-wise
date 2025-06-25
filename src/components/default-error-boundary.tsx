import type { ErrorComponentProps } from '@tanstack/react-router'

import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'

import { Button } from './ui/button'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false
  })

  console.error('Error:', error)

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => {
            void router.invalidate()
          }}
          type="button">
          Try Again
        </Button>
        {isRoot ? (
          <Link to="/">Home</Link>
        ) : (
          <Link
            onClick={(e) => {
              e.preventDefault()
              globalThis.history.back()
            }}
            to="/">
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}
