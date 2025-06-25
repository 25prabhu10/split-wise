import { createFileRoute } from '@tanstack/react-router'

import { CreateGroupForm } from '@/components/groups/create-group-form'

export const Route = createFileRoute('/_app/groups/create')({
  component: RouteComponent
})

function RouteComponent() {
  return <CreateGroupForm />
}
