import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns/format'
import { Suspense } from 'react'

import { GroupDetail } from '@/components/groups/group-detail'
import { GroupMembers } from '@/components/groups/group-members'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { groupQueries } from '@/services/group/group.queries'

export const Route = createFileRoute('/_app/groups/$groupId/')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(groupQueries.getGroupById(params.groupId))
  }
})

function RouteComponent() {
  const { groupId } = Route.useParams()

  const { data: group, error, isLoading } = useQuery(groupQueries.getGroupById(groupId))

  if (error) {
    return <div className="text-center text-destructive">Error: {error.message}</div>
  }

  if (!group) {
    return <div className="text-center text-destructive">Group not found</div>
  }

  return (
    <>
      <Card>
        <CardHeader>
          {isLoading ? (
            <CardTitle className="animate-pulse">Loading Group...</CardTitle>
          ) : (
            <>
              <CardTitle className="text-2xl">{group.name}</CardTitle>
              <p className="text-muted-foreground">
                Created on {format(new Date(group.createdAt), 'PPP')}
              </p>
            </>
          )}
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-4 w-32" />}>
            <GroupMembers groupId={group.id.toString()} />
          </Suspense>
        </CardContent>
        <CardFooter>
          <Link params={{ groupId: group.id.toString() }} to={'/groups/$groupId/edit'}>
            <Button variant="outline">Edit Group</Button>
          </Link>
        </CardFooter>
      </Card>
      <GroupDetail group={group} />
    </>
  )
}
