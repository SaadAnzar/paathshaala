"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold sm:text-4xl">Dashboard</h1>
      <div className="bg-primary inline-flex h-12 items-center space-x-3 rounded-lg p-1.5">
        <Link
          href="/dashboard"
          className={cn(
            pathname === "/dashboard"
              ? "bg-primary-foreground pointer-events-none"
              : "text-primary-foreground hover:opacity-80",
            "rounded-md px-4 py-1 text-base/relaxed font-semibold"
          )}
        >
          Tools
        </Link>
        <Link
          href="/saved"
          className={cn(
            pathname === "/saved"
              ? "bg-primary-foreground pointer-events-none"
              : "text-primary-foreground hover:opacity-80",
            "rounded-md px-4 py-1 text-base/relaxed font-semibold"
          )}
        >
          Saved
        </Link>
        <Link
          href="/billing"
          className={cn(
            pathname === "/billing"
              ? "bg-primary-foreground pointer-events-none"
              : "text-primary-foreground hover:opacity-80",
            "rounded-md px-4 py-1 text-base/relaxed font-semibold"
          )}
        >
          Billing
        </Link>
      </div>
    </div>
  );
}
