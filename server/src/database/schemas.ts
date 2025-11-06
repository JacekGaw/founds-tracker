import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  active: boolean("active").notNull().default(true),
  name: varchar("name", { length: 20 }),
  surname: varchar("surname", { length: 30 }),
  phone: varchar("phone", { length: 20 }),
});
