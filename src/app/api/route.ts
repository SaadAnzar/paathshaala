import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Not Authenticated", { status: 401 });
  }

  return new Response("Hello, Next.js!");
}
