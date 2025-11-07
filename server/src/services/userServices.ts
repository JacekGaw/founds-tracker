import { eq } from "drizzle-orm";
import db from "../database/db.js";
import { users } from "../database/schemas.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils";

interface UserUpdateData {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  phone?: string;
  active?: boolean;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface NewUser {
  id: number;
  email: string;
  password: string;
  name: string;
  surname?: string;
  currency: string;
}

export const getUsersFromDB = async (userId?: number): Promise<{}> => {
  try {
    let usersList = {};
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

export const getUserInfoFromDB = async (userId: number): Promise<{}> => {
  try {
    const userObject = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    console.log(userObject);
    return userObject;
  } catch (err) {
    console.error("Error getting user info from the database:", err);
    throw err;
  }
};

export const getUserByEmail = async (userEmail: string) => {
  try {
    const user = db.query.users.findFirst({
      where: eq(users.email, userEmail),
    });
    return user;
  } catch (err) {
    console.error("Error getting user by email: ", err);
    throw err;
  }
};

export const createUserInDB = async (
  email: string,
  password: string,
  name: string,
  currency: string,
  surname?: string
): Promise<NewUser> => {
  try {
    const hashedPassword = await hashPassword(password);
    const params = {
      email: email,
      password: hashedPassword,
      name: name,
      surname: surname,
      currency: currency
    };
    const [newUser] = await db.insert(users).values(params).returning();
    return newUser as NewUser;
  } catch (err) {
    console.error("Error adding user to the database:", err);
    throw err;
  }
};

export const deleteUserFromDb = async (usersId: number): Promise<{}> => {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, usersId))
      .returning();
    return deletedUser;
  } catch (err) {
    console.error("Error deleting user to the database:", err);
    throw err;
  }
};

export const updateUserInDB = async (
  data: UserUpdateData,
  userId: number
): Promise<{}> => {
  try {
    const updatedUser = await db
      .update(users)
      .set(data)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser[0];
  } catch (err) {
    console.error("Error updating user to the database:", err);
    throw err;
  }
};

export const changeUserPasswordInDB = async (
  data: ChangePasswordData,
  userId: number
): Promise<{} | null> => {
  try {
    const userInfo = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (!userInfo) {
      throw new Error("User not found");
    }

    const isOldPasswordCorrect = await comparePasswords(
      data.oldPassword,
      userInfo.password
    );
    if (!isOldPasswordCorrect) {
      return null;
    }

    const hashedNewPassword = await hashPassword(data.newPassword);

    const [updatedUser] = await db
      .update(users)
      .set({ password: hashedNewPassword })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  } catch (err) {
    console.error("Error updating user in the database:", err);
    throw err;
  }
};