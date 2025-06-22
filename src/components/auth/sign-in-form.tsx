import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountLogin, accountLoginSchema } from '@/db/schemas'
import { useAppForm } from '@/hooks/use-form'
import { authClient } from '@/lib/auth-client'

const signIn = async (data: AccountLogin) => {
  const { data: response, error } = await authClient.signIn.username({
    ...data
  })

  if (error) {
    throw new Error(error.message)
  }

  return response
}

export function SignInForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      toast.success(`Hey ${response.user.name}, welcome back!`)

      await queryClient.resetQueries()
      await navigate({ to: '/dashboard' })
    }
  })

  const form = useAppForm({
    defaultValues: {
      password: '12345678@Abc',
      username: 'john_doe'
    } as AccountLogin,
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value)
    },
    validators: {
      onChange: accountLoginSchema
    }
  })

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit().catch((error: unknown) => {
              console.error('Error during form submission:', error)
            })
          }}>
          <form.AppField
            children={(field) => (
              <field.TextField
                autoComplete="username"
                label="Username"
                placeholder="johndoe"
                required
                title="Enter your username"
                type="text"
              />
            )}
            name="username"
          />
          <form.AppField
            children={(field) => (
              <field.PasswordField
                autoComplete="new-password"
                label="Password"
                placeholder="********"
                required
                title="Password must be at least 8 characters long"
              />
            )}
            name="password"
          />
          <form.AppForm>
            <form.SubmitButton label="Sign In" />
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )
}
