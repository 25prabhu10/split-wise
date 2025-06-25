import { and, eq } from 'drizzle-orm'

import db from '../db'
import { expenseParticipant } from '../db/schemas/expense-participant.schema'
import { expense } from '../db/schemas/expense.schema'
import { transaction } from '../db/schemas/transaction.schema'

export const TransactionService = {
  /**
   * Create transactions for all participants when an expense is added
   * Each participant will have an unpaid transaction representing their share
   */
  async createTransactionsForExpense(
    expenseId: bigint,
    paidByUserId: string,
    createdByUserId: string,
    groupId?: bigint
  ) {
    // Get all participants for this expense
    const participants = await db
      .select({
        shareAmount: expenseParticipant.shareAmount,
        userId: expenseParticipant.userId
      })
      .from(expenseParticipant)
      .where(eq(expenseParticipant.expenseId, expenseId))

    // Get expense details for description
    const expenseDetails = await db
      .select({
        description: expense.description,
        groupId: expense.groupId
      })
      .from(expense)
      .where(eq(expense.id, expenseId))
      .then((rows: any[]) => rows[0])

    const transactions = []

    for (const participant of participants) {
      // Skip creating transaction if the participant is the one who paid
      if (participant.userId === paidByUserId) {
        continue
      }

      const transactionData = {
        amount: participant.shareAmount,
        createdBy: createdByUserId,
        description: `Share for: ${expenseDetails?.description || 'Expense'}`,
        expenseId,
        groupId: groupId || expenseDetails?.groupId,
        payerUserId: participant.userId, // The participant owes money
        receiverUserId: paidByUserId, // To the person who paid
        status: 'unpaid' as const,
        updatedBy: createdByUserId
      }

      const [insertedTransaction] = await db.insert(transaction).values(transactionData).returning()

      transactions.push(insertedTransaction)
    }

    return transactions
  },

  /**
   * Mark a transaction as paid when a user settles their share
   */
  async settleTransaction(transactionId: bigint, settledByUserId: string) {
    const now = new Date()

    const [updatedTransaction] = await db
      .update(transaction)
      .set({
        settledDate: now,
        status: 'paid',
        updatedAt: now,
        updatedBy: settledByUserId
      })
      .where(eq(transaction.id, transactionId))
      .returning()

    return updatedTransaction
  },

  /**
   * Update transactions when an expense is modified
   * This handles cases where expense amounts or participants change
   */
  async updateTransactionsForExpenseModification(expenseId: bigint, updatedByUserId: string) {
    // First, get the current expense details
    const expenseDetails = await db
      .select()
      .from(expense)
      .where(eq(expense.id, expenseId))
      .then((rows: any[]) => rows[0])

    if (!expenseDetails) {
      throw new Error('Expense not found')
    }

    // Get current participants
    const participants = await db
      .select()
      .from(expenseParticipant)
      .where(eq(expenseParticipant.expenseId, expenseId))

    // Get existing transactions for this expense
    const existingTransactions = await db
      .select()
      .from(transaction)
      .where(eq(transaction.expenseId, expenseId))

    // Delete existing unpaid transactions for this expense
    await db
      .delete(transaction)
      .where(and(eq(transaction.expenseId, expenseId), eq(transaction.status, 'unpaid')))

    // Create new transactions based on updated participants
    return await this.createTransactionsForExpense(
      expenseId,
      expenseDetails.paidByUserId,
      updatedByUserId,
      expenseDetails.groupId
    )
  },

  /**
   * Get all unpaid transactions for a user
   */
  async getUnpaidTransactionsForUser(userId: string) {
    return await db
      .select({
        amount: transaction.amount,
        description: transaction.description,
        expenseId: transaction.expenseId,
        groupId: transaction.groupId,
        id: transaction.id,
        receiverUserId: transaction.receiverUserId,
        transactionDate: transaction.transactionDate
      })
      .from(transaction)
      .where(and(eq(transaction.payerUserId, userId), eq(transaction.status, 'unpaid')))
  },

  /**
   * Get transaction history for auditing
   */
  async getTransactionHistory(transactionId: bigint) {
    return await db
      .select({
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        createdBy: transaction.createdBy,
        id: transaction.id,
        settledDate: transaction.settledDate,
        status: transaction.status,
        updatedAt: transaction.updatedAt,
        updatedBy: transaction.updatedBy
      })
      .from(transaction)
      .where(eq(transaction.id, transactionId))
  }
}
