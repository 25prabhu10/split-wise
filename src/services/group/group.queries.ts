import { queryOptions } from '@tanstack/react-query'

import { getGroupById, getUserGroups } from './group.service'

export const GROUP_QUERY_KEYS = ['groups']

export const groupQueries = {
  all: () => [...GROUP_QUERY_KEYS],
  getUserGroups: () =>
    queryOptions({
      queryFn: ({ signal }) => getUserGroups({ signal }),
      queryKey: [...GROUP_QUERY_KEYS, 'user-groups']
    }),
  getGroupById: (id: string) =>
    queryOptions({
      queryFn: ({ signal }) => getGroupById({ data: { id }, signal }),
      queryKey: [...GROUP_QUERY_KEYS, id]
    })
}
