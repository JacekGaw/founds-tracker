import { and, eq, gte, lte, desc, ilike } from "drizzle-orm";
import db from "../database/db";
import { transactions } from "../database/schemas";

export const getTransactionsDB = async (
  userId: number,
  categoryId?: number,
  type?: "expense" | "savings" | "income",
  from?: string,
  to?: string,
  phrase?: string
): Promise<(typeof transactions.$inferSelect)[]> => {
  try {
    const conditions = [eq(transactions.userId, userId)];
    if (categoryId) {
      conditions.push(eq(transactions.categoryId, categoryId));
    }
    if (type) {
        conditions.push(eq(transactions.type, type));
      }
    if (from) {
      conditions.push(gte(transactions.transactionDate, from));
    }

    if (to) {
      conditions.push(lte(transactions.transactionDate, to));
    }

    if (phrase && phrase.trim() !== "") {
      conditions.push(ilike(transactions.description, `%${phrase}%`));
    }

    const result = await db
      .select()
      .from(transactions)
      .where(and(...conditions))
      .orderBy(desc(transactions.transactionDate));

    return result;
  } catch (err) {
    throw err;
  }
};

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
