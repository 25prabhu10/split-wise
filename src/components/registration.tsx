import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RegistrationData {
  confirmPassword: string
  email: string
  name: string
  password: string
}

interface RegistrationProps {
  error?: string
  isLoading?: boolean
  onSubmit?: (data: RegistrationData) => void
}

export function Registration({ error, isLoading = false, onSubmit }: RegistrationProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    confirmPassword: '',
    email: '',
    name: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      return
    }

    onSubmit?.(formData)
  }

  const passwordMismatch =
    formData.password !== formData.confirmPassword && formData.confirmPassword !== ''

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Error message container with fixed height to prevent layout shift */}
          <div className="min-h-[24px]">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            {passwordMismatch && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                Passwords do not match
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                disabled={isLoading}
                id="name"
                onChange={(e) => {
                  handleInputChange('name', e.target.value)
                }}
                placeholder="Enter your full name"
                required
                type="text"
                value={formData.name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                disabled={isLoading}
                id="email"
                onChange={(e) => {
                  handleInputChange('email', e.target.value)
                }}
                placeholder="Enter your email"
                required
                type="email"
                value={formData.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pr-9 pl-9"
                disabled={isLoading}
                id="password"
                minLength={6}
                onChange={(e) => {
                  handleInputChange('password', e.target.value)
                }}
                placeholder="Create a password"
                required
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pr-9 pl-9"
                disabled={isLoading}
                id="confirmPassword"
                onChange={(e) => {
                  handleInputChange('confirmPassword', e.target.value)
                }}
                placeholder="Confirm your password"
                required
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                disabled={isLoading}
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword)
                }}
                size="sm"
                type="button"
                variant="ghost">
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button className="w-full" disabled={isLoading || passwordMismatch} type="submit">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a className="text-primary hover:underline" href="/sign-in">
              Sign in
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
