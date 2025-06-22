import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useQueryClient } from '@tanstack/react-query'
import { createLink, useRouter } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { authClient, useAuthenticatedUser } from '@/lib/auth-client'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const ItemLink = createLink(DropdownMenuItem)

export function UserMenu() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const user = useAuthenticatedUser()
  const [open, setOpen] = useState(false)

  async function logoutFn() {
    await authClient.signOut()
    await queryClient.invalidateQueries()
    await router.invalidate()
  }

  function handleSignOut() {
    logoutFn().catch((error: unknown) => {
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
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 rounded-full" variant="ghost">
          <Avatar className="flex h-8 w-8 items-center justify-center">
            <AvatarImage alt="User avatar" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ItemLink
          className="cursor-pointer"
          onClick={() => {
            setOpen(false)
          }}
          to="/">
          Profile
        </ItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600" onSelect={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
