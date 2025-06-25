import { queryOptions } from '@tanstack/react-query'
import { getGroupMembersByGroupId } from './group-members.service'

export const GROUP_MEMBER_QUERY_KEYS = ['groups-members']

export const groupMemberQueries = {
  getGroupMembersByGroupId: (id: string) =>
    queryOptions({
      queryFn: ({ signal }) => getGroupMembersByGroupId({ data: { id }, signal }),
      queryKey: [...GROUP_MEMBER_QUERY_KEYS, id, 'users']
    })
}
