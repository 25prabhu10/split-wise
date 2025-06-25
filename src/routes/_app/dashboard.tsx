import { createFileRoute } from '@tanstack/react-router'

import { KpiCards } from '@/components/dashboard/kpi-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { WelcomeCard } from '@/components/dashboard/welcome-card'

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <WelcomeCard userName="John Doe" />

      <KpiCards totalActiveGroups={0} totalOwedToYou={0} totalYouOwe={0} />

      <QuickActions />

      {/* <div className="xl:col-span-2">
        <RecentActivity activities={data.recentActivities} />
      </div>

      <TransactionSummaryComponent transactions={data.transactions} /> */}
    </div>
  )
}
