import { queryOptions } from '@tanstack/react-query'

import { getUser } from './auth.service'

export const labels = ['auth']

export const authQueries = {
  getUser: () =>
    queryOptions({
      queryFn: ({ signal }) => getUser({ signal }),
      queryKey: [...labels, 'user']
    })
}
