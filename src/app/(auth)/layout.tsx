import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <div className="flex h-screen items-center justify-center">
      {!userId && (
        <Link
          href="/"
          className={cn(buttonVariants(), "fixed left-4 top-4 h-7 px-2.5")}
        >
          <ArrowLeft className="mr-1 size-3.5" />
          Back
        </Link>
      )}
      {userId && (
        <div className="fixed flex h-screen items-center justify-center">
          <Loader className="size-6 animate-spin" />
        </div>
      )}

      {children}
    </div>
  );
}
