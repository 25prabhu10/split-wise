/// <reference types="vite/client" />

import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts
} from '@tanstack/react-router'

import { DefaultCatchBoundary } from '@/components/default-error-boundary'
import { NotFound } from '@/components/not-found'
import { seo } from '@/lib/seo'
import { getUser } from '@/services/auth.service'
import appCss from '@/styles/app.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: Awaited<ReturnType<typeof getUser>>
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryFn: ({ signal }) => getUser({ signal }),
      queryKey: ['user']
    }) // we're using react-query for caching, see router.tsx
    return { user }
  },
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  head: () => ({
    links: [
      { href: appCss, rel: 'stylesheet' },
      {
        href: '/favicon.svg',
        rel: 'icon',
        type: 'image/svg+xml'
      }
    ],
    meta: [
      {
        charSet: 'utf8'
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport'
      },
      ...seo({
        description: 'Split expenses among friends and family with ease.',
        keywords: 'expense sharing, split expenses, group expenses, financial management',
        title: 'SplitWise - Effortless Expense Sharing'
      })
    ]
  }),
  notFoundComponent: () => <NotFound />
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="will-change antialiased transition-colors duration-300 ease-in-out">
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        {children}

        <Scripts />
      </body>
    </html>
  )
}
