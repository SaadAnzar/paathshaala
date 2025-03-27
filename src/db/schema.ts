import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const subscriptionEnum = pgEnum("subscription", [
  "free",
  "basic",
  "pro",
]);

export const toolEnum = pgEnum("tool", [
  "lesson-plan-generator",
  "worksheet-generator",
  "activity-generator",
  "concept-simplifier",
  "feedback-generator",
]);

export const typeEnum = pgEnum("type", ["plan", "worksheet", "slide"]);

const timestampsWithDeleted = {
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deleted: boolean().notNull().default(false),
};

export const usersTable = pgTable("users", {
  clerkId: text("clerk_id").primaryKey().unique().notNull(),
  email: text().notNull().unique(),
  name: text().notNull(),
  credits: integer().notNull().default(20),
  role: roleEnum().notNull().default("user"),
  subscription: subscriptionEnum().notNull().default("free"),
  ...timestampsWithDeleted,
});

export const savedSheetsTable = pgTable("saved_sheets", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.clerkId, { onDelete: "cascade" }),
  tool: toolEnum().notNull(),
  type: typeEnum(),
  input: json().notNull(),
  output: text().notNull(),
  ...timestampsWithDeleted,
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export type SelectSavedSheet = typeof savedSheetsTable.$inferSelect;
export type InsertSavedSheet = typeof savedSheetsTable.$inferInsert;
