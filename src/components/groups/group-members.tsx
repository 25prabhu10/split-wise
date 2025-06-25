import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { groupMemberQueries } from '@/services/group-members/group-members.queries'

interface GroupMembersProps {
  groupId: string
}

export function GroupMembers({ groupId }: GroupMembersProps) {
  const { data: groupMembers, error } = useSuspenseQuery(
    groupMemberQueries.getGroupMembersByGroupId(groupId)
  )

  if (error) {
    return <div className="text-center text-destructive">Error: {error.message}</div>
  }

  return (
    <div>
      <h3 className="mb-2 font-semibold">Members ({groupMembers.length})</h3>
      <div className="flex flex-wrap gap-2">
        {groupMembers.length === 0 ? (
          <div className="text-muted-foreground">No members available</div>
        ) : (
          groupMembers.map((member) => (
            <Badge className="flex items-center gap-2" key={member.id} variant="secondary">
              <Avatar className="h-5 w-5">
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              </Avatar>
              {`${member.name} (${member.username}) joined on ${format(new Date(member.joinedAt), 'PPP')}`}
            </Badge>
          ))
        )}
      </div>
    </div>
  )
}
