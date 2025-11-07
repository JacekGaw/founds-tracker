import { eq } from "drizzle-orm";
import db from "../database/db.js";
import { users } from "../database/schemas.js";



export const getUsersFromDB = async (userId?: number): Promise<(typeof users.$inferSelect)[]> => {
  try {
    let usersList = [];
    if (userId) {
      usersList = await db.query.users.findMany({
        where: eq(users.id, userId),
      });
    } else {
      usersList = await db.query.users.findMany();
    }
    return usersList;
  } catch (err) {
    console.error("Error getting users from the database:", err);
    throw err;
  }
};

export const getFirstUserFromDb = async (): Promise<(typeof users.$inferSelect)> => {
  try {
    const user = await db.select().from(users).limit(1);
    return user[0];
  } catch (err) {
    console.error("Error counting users in db:", err);
    throw err;
  }
}