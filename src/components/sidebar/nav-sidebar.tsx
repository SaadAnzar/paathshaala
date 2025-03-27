import Link from "next/link";
import {
  Bookmark,
  CreditCard,
  LayoutDashboard,
  LucideIcon,
  Paintbrush,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavLinkProps {
  title: string;
  href: string;
  icon: LucideIcon;
  items?: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

const navLinks: NavLinkProps[] = [
  {
    title: "Tools",
    href: "/tools",
    icon: Paintbrush,
    items: [
      {
        title: "Lesson Plan Generator",
        href: "/tools/lesson-plan-generator",
        icon: LayoutDashboard,
      },
      {
        title: "Worksheet Generator",
        href: "/tools/worksheet-generator",
        icon: LayoutDashboard,
      },
      {
        title: "Activity Generator",
        href: "/tools/activity-generator",
        icon: LayoutDashboard,
      },
      {
        title: "Concept Simplifier",
        href: "/tools/concept-simplifier",
        icon: LayoutDashboard,
      },
      {
        title: "Feedback Generator",
        href: "/tools/feedback-generator",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Saved",
    href: "/saved",
    icon: Bookmark,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
];

export function NavSidebar() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className="h-9">
              <Link href={item.href}>
                <item.icon className="fill-violet-500 text-violet-800" />
                {item.title}
              </Link>
            </SidebarMenuButton>

            {item.items?.length ? (
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild className="h-9">
                      <Link href={subItem.href}>
                        <subItem.icon className="fill-violet-500 text-violet-800" />
                        {subItem.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
