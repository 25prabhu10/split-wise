import { Link } from '@tanstack/react-router'
import { CreditCard, Plus, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Button className="h-20 flex-col gap-2 bg-destructive hover:bg-destructive/80" size="lg">
            <Plus className="h-5 w-5" />
            Add an Expense
          </Button>

          <Button asChild className="h-20 flex-col gap-2 bg-primary hover:bg-primary/80" size="lg">
            <Link to="/groups/create">
              <Users className="h-5 w-5" />
              Create a Group
            </Link>
          </Button>

          <Button className="h-20 flex-col gap-2 bg-success hover:bg-success/80" size="lg">
            <CreditCard className="h-5 w-5" />
            Settle All Debts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
