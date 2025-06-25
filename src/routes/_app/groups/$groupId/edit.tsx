import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { groupQueries } from '@/services/group/group.queries'
import { EditGroupForm } from '@/components/groups/edit-group-form'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute('/_app/groups/$groupId/edit')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(groupQueries.getGroupById(params.groupId))
  }
})

function RouteComponent() {
  const { groupId } = Route.useParams()
  const router = useRouter()

  const { data: group, error, isLoading } = useQuery(groupQueries.getGroupById(groupId))

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-destructive">Error: {error.message}</div>
  }

  if (!group) {
    return <div className="text-center text-destructive">Group not found</div>
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={() => router.navigate({ to: `/groups/${group.id}` })}
          size="sm"
          variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Group
        </Button>
        <h1 className="text-2xl font-bold">Edit Group Details</h1>
      </div>

      <Suspense fallback={<Skeleton className="h-10 w-1/3" />}>
        <EditGroupForm groupId={group.id} />
      </Suspense>
    </>
  )
}
