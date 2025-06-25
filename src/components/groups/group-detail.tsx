import { format } from 'date-fns'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Group } from '@/services/group/group.validators'

import { GroupMembers } from './group-members'

interface GroupDetailProps {
  group: Group
}

export function GroupDetail({ group }: GroupDetailProps) {
  return (
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {expensesLoading ? (
            <div>Loading expenses...</div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No expenses yet</p>
              <p className="text-sm">Add an expense to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id.toString()}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{expense.description}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Paid by {expense.paidBy.name}</span>
                      <span>•</span>
                      <span>{format(new Date(expense.incurredAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      ${Number(expense.amount).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(expense.createdAt), 'MMM dd, HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card> */}
    </>
  )
}
