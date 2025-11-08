import db from "../database/db";
import { transactions } from "../database/schemas";


export const addNewTransactionDB = async (
    userId: number,
    transactionDate: string,
    type: "income" | "expense" | "savings",
    categoryId: number,
    amount: number,
    description: string
  ): Promise<typeof transactions.$inferSelect> => {
    try {
      const [transaction] = await db
        .insert(transactions)
        .values({
          userId,
          transactionDate,
          type,
          categoryId,
          amount: amount.toFixed(2),
          description,
        })
        .returning();
  
      if (!transaction) {
        throw new Error("Failed to insert transaction");
      }
  
      return transaction;
    } catch (err) {
      console.error("Database error:", err);
      throw err;
    }
  };