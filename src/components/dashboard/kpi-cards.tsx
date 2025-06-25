import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

interface KpiCardsProps {
  totalActiveGroups: number
  totalOwedToYou: number
  totalYouOwe: number
}

export function KpiCards({ totalActiveGroups, totalOwedToYou, totalYouOwe }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card
        className={cn(
          'border-l-4',
          totalYouOwe > 0 ? 'border-l-destructive bg-destructive/10' : 'border-l-accent-foreground'
        )}>
        <CardHeader className="pb-2">
          <CardTitle className="font-medium">Total You Owe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn('text-3xl font-bold', totalYouOwe > 0 ? 'text-destructive' : '')}>
            {formatCurrency(totalYouOwe)}
          </div>
          {totalYouOwe > 0 && <p className="mt-1 text-xs text-destructive">Outstanding debt</p>}
        </CardContent>
      </Card>

      <Card
        className={cn(
          'border-l-4',
          totalOwedToYou > 0 ? 'border-l-success bg-success/10' : 'border-l-accent-foreground'
        )}>
        <CardHeader className="pb-2">
          <CardTitle className="font-medium">Total Owed to You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn('text-3xl font-bold', totalOwedToYou > 0 ? 'text-success' : '')}>
            {formatCurrency(totalOwedToYou)}
          </div>
          {totalOwedToYou > 0 && <p className="mt-1 text-xs text-success">Money to collect</p>}
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-accent-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="font-medium">Active Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent-foreground">{totalActiveGroups}</div>
          <Link
            to="/groups"
            className="text-sm text-accent-foreground underline underline-offset-6 hover:underline-offset-4">
            View all groups
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
