import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import { SignedIn } from './auth/signed-in'
import { SignedOut } from './auth/signed-out'
import { UserMenu } from './user-menu'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="flex items-center space-x-6">
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          to="/">
          Home
        </Link>
        <SignedIn>
          <Link
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            to="/dashboard">
            Dashboard
          </Link>
        </SignedIn>
      </div>

      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserMenu />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </nav>
  )
}
