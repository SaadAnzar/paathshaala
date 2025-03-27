"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Home, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (isLoaded && isSignedIn) {
    router.push("/tools");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {isLoaded ? (
        <>
          {!isSignedIn && (
            <Link
              href="/"
              className={cn(buttonVariants(), "fixed left-4 top-4 h-8 px-2")}
            >
              <Home />
              Home
            </Link>
          )}

          {children}
        </>
      ) : (
        <Loader2 className="size-8 animate-spin" />
      )}
    </div>
  );
}
