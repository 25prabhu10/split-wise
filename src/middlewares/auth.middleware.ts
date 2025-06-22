// import { auth } from '@/lib/auth'
// import { createMiddleware } from '@tanstack/react-start'
// import { getWebRequest } from '@tanstack/react-start/server'

// export const authMiddleware = createMiddleware().server(async ({ next }) => {
//   const { headers } = getWebRequest()
//   const session = await auth.api.getSession({ headers })

//   return await next({
//     context: {
//       username: session?.user?.username
//     }
//   })
// })

export const Add = (a: number, b: number): number => {
  return a + b
}
