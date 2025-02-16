"use client";

import { School } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function HeaderSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-inherit active:bg-inherit data-[state=open]:bg-inherit"
          onClick={toggleSidebar}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-300 text-violet-700">
            <School className="size-5" strokeWidth={2.5} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <h1 className="truncate bg-gradient-to-r from-violet-700 to-violet-400 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
              PaathShaala
            </h1>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
