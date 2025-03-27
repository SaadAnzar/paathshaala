"use client";

import { School } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileNav() {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="absolute left-1/2 inline-flex -translate-x-1/2 items-center justify-center gap-2">
        <School
          className="size-5 fill-violet-300 text-violet-800"
          strokeWidth={2.5}
        />
        <div className="grid text-left text-sm leading-tight">
          <h1 className="bg-gradient-to-r from-violet-700 to-violet-400 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
            PaathShaala
          </h1>
        </div>
      </div>
    </header>
  );
}
