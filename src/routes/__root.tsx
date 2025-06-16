/// <reference types="vite/client" />
import type { ReactNode } from 'react'

import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'

import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [{ href: appCss, rel: 'stylesheet' }],
    meta: [
      {
        charSet: 'utf8'
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport'
      },
      ...seo({
        description: '',
        title: ''
      })
    ]
  })
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
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
