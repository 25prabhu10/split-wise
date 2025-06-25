import { queryOptions } from '@tanstack/react-query'

import { getAvailableUsers } from './user.service'

export const userQueries = {
  all: ['users'],
  getAvailableUsers: () =>
    queryOptions({
      queryFn: ({ signal }) => getAvailableUsers({ signal }),
      queryKey: [...userQueries.all, 'available']
    })
}
