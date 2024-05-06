import { cache } from "react";
import db from "@/db/drizzle";

export const getUser = cache(async () => {
  const data = await db.query.users.findMany();

  return data;
});
