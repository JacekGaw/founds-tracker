import { eq } from "drizzle-orm";
import db from "../database/db";
import { categories } from "../database/schemas";


export const getCategoriesDB = async (userId: number): Promise<(typeof categories.$inferSelect)[]> => {
    try {
        return await db.select().from(categories).where(eq(categories.userId, userId));
    } catch (err) {
        throw err;
    }
}