import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCanGoBack, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppForm } from '@/hooks/use-form'
import { GROUP_QUERY_KEYS } from '@/services/group/group.queries'
import { createGroup } from '@/services/group/group.service'
import { createGroupValidator } from '@/services/group/group.validators'

export function CreateGroupForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const canGoBack = useCanGoBack()

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: async (group) => {
      toast.success(`Group ${group.name} created successfully!`)
      // TODO: Invalidate the get all groups query to refresh the list
      queryClient.invalidateQueries({
        queryKey: [...GROUP_QUERY_KEYS]
      })
      router.navigate({ params: { groupId: group.id }, to: '/groups/$groupId' })
    }
  })

  const form = useAppForm({
    defaultValues: {
      name: ''
    },
    onSubmit: async ({ value }) => {
      await createGroupMutation.mutateAsync({ data: value })
    },
    validators: {
      onChange: createGroupValidator
    }
  })

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a New Group</CardTitle>
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
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                if (canGoBack) router.history.back()
                else router.navigate({ to: '/' })
              }}
              type="button"
              variant="outline">
              Cancel
            </Button>
            <form.AppForm>
              <form.SubmitButton label="Create Group" />
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
