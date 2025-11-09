import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  integer,
  text,
  numeric,
  date,
  char
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  active: boolean("active").notNull().default(true),
  name: varchar("name", { length: 20 }).notNull(),
  surname: varchar("surname", { length: 30 }),
  phone: varchar("phone", { length: 20 }),
  currency: varchar("currency", { length: 3 }).notNull()
});

export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense', 'savings']);


export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 20 }).notNull(),
    type: transactionTypeEnum('type').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    color: char("color", {length: 7})
})

export const transactions = pgTable("transactions", {
    id: serial("id").primaryKey(),
    categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
    type: transactionTypeEnum().notNull().default("expense"),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    transactionDate: date('transaction_date').defaultNow().notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
})


export const usersRelations = relations(users, ({ many }) => ({
    categories: many(categories),
    transactions: many(transactions),
  }));
  
  export const categoriesRelations = relations(categories, ({ one, many }) => ({
    user: one(users, {
      fields: [categories.userId],
      references: [users.id],
    }),
    transactions: many(transactions),
  }));
  
  export const transactionsRelations = relations(transactions, ({ one }) => ({
    user: one(users, {
      fields: [transactions.userId],
      references: [users.id],
    }),
    category: one(categories, {
      fields: [transactions.categoryId],
      references: [categories.id],
    }),
  }));