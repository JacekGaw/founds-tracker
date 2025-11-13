import { eq } from "drizzle-orm";
import db from "../database/db";
import { categories } from "../database/schemas";

export type NewCategory = {
  userId: number;
  name: string;
  type: "expense" | "income" | "savings";
  color: string;
};

export const getCategoriesDB = async (
  userId: number
): Promise<(typeof categories.$inferSelect)[]> => {
  try {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId));
  } catch (err) {
    throw err;
  }
};

export const addCategoriesDB = async (
  data: NewCategory[]
): Promise<(typeof categories.$inferSelect)[]> => {
  try {
    return await db.insert(categories).values(data).returning();
  } catch (err) {
    throw err;
  }
};

export const deleteCategoryDB = async (
  categoryId: number
): Promise<typeof categories.$inferSelect> => {
  try {
    const [deleted] = await db
      .delete(categories)
      .where(eq(categories.id, categoryId))
      .returning();
    return deleted;
  } catch (err) {
    throw err;
  }
};

export const updateCategoryDB = async (
  categoryId: number,
  data: Partial<typeof categories.$inferInsert>
): Promise<typeof categories.$inferSelect> => {
  try {
    const updatedCategory = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, categoryId))
      .returning();
    return updatedCategory[0];
  } catch (err) {
    throw err;
  }
};
