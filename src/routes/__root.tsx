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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { DefaultCatchBoundary } from '@/components/default-error-boundary'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { NotFound } from '@/components/not-found'
import { Toaster } from '@/components/ui/sonner'
import { seo } from '@/lib/seo'
import { authQueries } from '@/services/auth/auth.queries'
import appCss from '@/styles/app.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(authQueries.getUser())
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
      <body className="antialiased">
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        <Header>
          <Navbar />
        </Header>

        {children}

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <Scripts />
      </body>
    </html>
  )
}
