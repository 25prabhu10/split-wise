import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppForm } from '@/hooks/use-form'
import { authClient } from '@/lib/auth-client'
import { SignUpSchema } from '@/lib/auth.schema'

export function SignUpForm() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (response) => {
      console.log(`Welcome ${response.user.name}, your account has been created!`)
      await queryClient.resetQueries()
      await router.invalidate()
    }
  })

  const form = useAppForm({
    defaultValues: {
      confirmPassword: '12345678@Abc',
      email: 'john@doe.com',
      name: 'John Doe',
      password: '12345678@Abc'
    },
    onSubmit: async ({ value }) => {
      await signUpMutation.mutateAsync(value)
    }
  })

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Create a new account to get started
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
                autoComplete="name"
                label="Name"
                placeholder="John Doe"
                required
                title="Enter your full name"
              />
            )}
            name="name"
          />
          <form.AppField
            children={(field) => (
              <field.TextField
                autoComplete="email"
                label="Email"
                placeholder="john@doe.com"
                required
                title="Enter your email address"
                type="email"
              />
            )}
            name="email"
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
          <form.AppField
            children={(field) => (
              <field.PasswordField
                autoComplete="new-password"
                label="Confirm Password"
                placeholder="********"
                required
                title="Please confirm your password"
              />
            )}
            name="confirmPassword"
          />
          <form.AppForm>
            <form.SubmitButton label="Sign Up" />
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )
}

async function signUp(data: SignUpSchema) {
  const { data: response, error } = await authClient.signUp.email({
    email: data.email,
    name: data.name,
    password: data.password
  })

  if (error) {
    throw new Error(error.message)
  }

  return response
}
