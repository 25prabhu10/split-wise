import { Link } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

interface NavbarProps {
  isAuthenticated: boolean
  onSignOut: () => Promise<void>
  userName?: string
}

export function Navbar({ isAuthenticated, onSignOut, userName }: NavbarProps) {
  function handleSignOut() {
    onSignOut().catch((error: unknown) => {
      toast.error('Failed to sign out user', {
        action: {
          label: 'Retry',
          onClick: () => {
            handleSignOut()
          }
        },
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        duration: 3000,
        position: 'top-right'
      })
    })
  }

  return (
    <nav className="flex items-center justify-end gap-4">
      <div className="flex items-center space-x-6">
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          to="/">
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              to="/dashboard">
              Dashboard
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              to="/">
              Profile
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="hidden text-foreground sm:inline-block">{userName}</span>
            </div>
            <Button
              className="flex items-center space-x-2"
              onClick={handleSignOut}
              variant="outline">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Sign out</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
