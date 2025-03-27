import { db } from "@/db";
import {
  InsertSavedSheet,
  InsertUser,
  savedSheetsTable,
  SelectSavedSheet,
  SelectUser,
  usersTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function insertUser(user: InsertUser) {
  await db.insert(usersTable).values(user);
}

export async function insertSavedSheet(sheet: InsertSavedSheet) {
  try {
    await db.insert(savedSheetsTable).values(sheet);
    return true;
  } catch (error) {
    console.error("Error inserting saved sheet:", error);
    return false;
  }
}

export async function getUserById(clerkId: SelectUser["clerkId"]): Promise<{
  clerkId: string;
  name: string;
  email: string;
  credits: number;
  role: SelectUser["role"];
  subscription: SelectUser["subscription"];
} | null> {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, clerkId))
    .limit(1);
  return result[0] || null;
}

export async function getSavedSheetsByUserId(
  userId: SelectUser["clerkId"],
  limit: number = 100,
  offset: number = 0
): Promise<
  Array<{
    id: string;
    userId: string;
    tool: SelectSavedSheet["tool"];
    type: SelectSavedSheet["type"];
    input: SelectSavedSheet["input"];
    output: string;
  }>
> {
  return db
    .select()
    .from(savedSheetsTable)
    .where(eq(savedSheetsTable.userId, userId))
    .limit(limit)
    .offset(offset);
}
