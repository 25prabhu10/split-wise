import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { useAppForm } from '@/hooks/use-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { GROUP_QUERY_KEYS, groupQueries } from '@/services/group/group.queries'
import { updateGroup } from '@/services/group/group.service'
import { toast } from 'sonner'
import { updateGroupValidator } from '@/services/group/group.validators'
import { useRouter } from '@tanstack/react-router'

type EditGroupFormProps = {
  groupId: string
}

export function EditGroupForm({ groupId }: EditGroupFormProps) {
  const { data: group, error } = useSuspenseQuery(groupQueries.getGroupById(groupId))
  const queryClient = useQueryClient()
  const router = useRouter()

  if (error) {
    return <div className="text-center text-destructive">Error: {error.message}</div>
  }

  const updateGroupNameMutation = useMutation({
    mutationFn: updateGroup,
    onSuccess: async (group) => {
      toast.success(`Group ${group.name} updated successfully!`)
      queryClient.invalidateQueries(groupQueries.getGroupById(groupId))
      await router.invalidate()
    }
  })

  const form = useAppForm({
    defaultValues: {
      name: group.name,
      id: group.id
    },
    onSubmit: async ({ value }) => {
      await updateGroupNameMutation.mutateAsync({ data: { id: groupId, name: value.name } })
    },
    validators: {
      onChange: updateGroupValidator
    }
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit().catch((error: unknown) => {
              console.error('Error during group creation:', error)
            })
          }}>
          <form.AppField
            children={(field) => (
              <field.TextField
                spellCheck={true}
                label="Group Name"
                placeholder="Trip to Hawaii"
                required
                title="Enter group name"
              />
            )}
            name="name"
          />
          <form.AppForm>
            <form.SubmitButton label="Update Group Name" />
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )
}
