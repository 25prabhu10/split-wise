import { queryOptions } from '@tanstack/react-query'

import { getUser } from './auth.service'

export const authQueries = {
  all: ['auth'],
  getUser: () =>
    queryOptions({
      queryFn: ({ signal }) => getUser({ signal }),
      queryKey: [...authQueries.all, 'getUser']
    })
}
