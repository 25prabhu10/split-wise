import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WelcomeCardProps {
  userName?: string
}

export function WelcomeCard({ userName = 'User' }: WelcomeCardProps) {
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {greeting}, {userName}! 👋
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Welcome back to your expense tracker. Here's your financial overview.
        </p>
      </CardContent>
    </Card>
  )
}
