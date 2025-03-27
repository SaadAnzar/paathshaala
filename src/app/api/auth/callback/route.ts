import { NextResponse } from "next/server";
import { getUserById, insertUser } from "@/db/queries";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: any) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get("redirect_url");

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    try {
      await insertUser({
        clerkId: user.id,
        name: user.fullName || "PaathShaala",
        email: user.emailAddresses[0].emailAddress,
      });
      return new NextResponse("User created", {
        status: 302, // 302 Found - temporary redirect
        headers: {
          location: redirectUrl,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new NextResponse("Error creating user", { status: 500 });
    }
  }

  return new NextResponse("User already exists", {
    status: 302, // 302 Found - temporary redirect
    headers: {
      location: redirectUrl,
    },
  });
}
