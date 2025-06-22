import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppForm } from '@/hooks/use-form'
import { authClient } from '@/lib/auth-client'
import { SignInSchema } from '@/lib/auth.schema'

export function SignInForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      console.log(`Hey ${response.user.name}, welcome back!`)

      await queryClient.resetQueries()
      await navigate({ to: '/' })
    }
  })

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: ''
    } as SignInSchema,
    onSubmit: async ({ value }) => {
      const response = await signInMutation.mutateAsync(value)
      console.log(`Hey ${response.user.name}, welcome back!`)
      // , {
      //   onError: (error) => {
      //     console.error("Sign in error:", error);
      //     return {
      //       form: 'Invalid email or password. Please try again.',
      //       fields: {
      //         email: error.error.message
      //       }
      //     }
      //   },
      //   onSuccess: async () => {
      //     await queryClient.invalidateQueries({ queryKey: ["user"] });
      //     navigate({ to: "/" });
      //   },
      // }
      // )
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
          {/* <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                disabled={isLoading}
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Enter your email"
                required
                type="email"
                value={email}
              />
            </div> */}
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

          {/* <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 pr-9"
                disabled={isLoading}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="Enter your password"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <Button
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                disabled={isLoading}
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                size="sm"
                type="button"
                variant="ghost">
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div> */}
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

async function signIn(data: SignInSchema) {
  const { data: response, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password
  })

  if (error) {
    throw new Error(error.message)
  }

  return response
}
