import { createFileRoute, redirect } from '@tanstack/react-router'

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
  }
})
