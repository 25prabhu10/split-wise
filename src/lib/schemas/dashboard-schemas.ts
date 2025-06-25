import { z } from 'zod/v4'

export const recentActivitySchema = z.object({
  amount: z.number(),
  date: z.string(),
  description: z.string(),
  groupName: z.string().optional(),
  id: z.string(),
  type: z.enum(['expense_added', 'payment_made', 'settlement']),
  userName: z.string()
})

export const transactionHistoryItemSchema = z.object({
  amount: z.number(),
  avatarUrl: z.string().optional(),
  direction: z.enum(['Incoming', 'Outgoing']),
  id: z.string(),
  name: z.string(),
  timestamp: z.string()
})

export const dashboardDataSchema = z.object({
  recentActivities: z.array(recentActivitySchema),
  totalActiveGroups: z.number(),
  totalOwedToYou: z.number(),
  totalYouOwe: z.number(),
  transactions: z.array(transactionHistoryItemSchema)
})

export const groupSummarySchema = z.object({
  amountPaid: z.number(),
  balance: z.number(),
  groupName: z.string(),
  id: z.string(),
  totalExpenses: z.number(),
  yourShare: z.number()
})

export type DashboardData = z.infer<typeof dashboardDataSchema>
export type GroupSummary = z.infer<typeof groupSummarySchema>
export type RecentActivity = z.infer<typeof recentActivitySchema>
export type TransactionHistoryItem = z.infer<typeof transactionHistoryItemSchema>
