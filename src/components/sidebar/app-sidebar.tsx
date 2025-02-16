import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HeaderSidebar } from "@/components/sidebar/header-sidebar";
import { NavSidebar } from "@/components/sidebar/nav-sidebar";
import { NavUser } from "@/components/sidebar/nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await currentUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavSidebar />
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser
            user={{
              name: user.fullName || "PaathShaala",
              email: user.emailAddresses[0].emailAddress,
              avatar: user.imageUrl,
            }}
          />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
