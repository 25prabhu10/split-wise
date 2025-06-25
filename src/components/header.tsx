import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  children?: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-md font-bold text-foreground md:text-xl">Split Wise</h1>
        </div>

        <div className="flex-1">{children}</div>

        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
