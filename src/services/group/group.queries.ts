import { queryOptions } from '@tanstack/react-query'

import { getGroupById } from './group.service'

export const GROUP_QUERY_KEYS = ['groups']

export const groupQueries = {
  getGroupById: (id: string) =>
    queryOptions({
      queryFn: ({ signal }) => getGroupById({ data: { id }, signal }),
      queryKey: [...GROUP_QUERY_KEYS, id]
    })
}
