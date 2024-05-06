import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Bookmark,
  CreditCard,
  Grape,
  LayoutDashboard,
  LogIn,
  LogOut,
  University,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const user = await currentUser();

  const credits: number = 10;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-4 py-2 backdrop-blur-lg sm:px-8">
      <aside className="inline-flex items-center justify-center">
        <University className="mr-2 size-5 text-violet-600" strokeWidth={2.5} />
        <h1 className="bg-gradient-to-r from-violet-900 to-violet-400 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
          PaathShaala
        </h1>
      </aside>

      <aside>
        {user ? (
          <nav className="inline-flex items-center justify-center">
            <div className="mr-4 hidden items-center rounded-2xl px-2 py-1 text-sm font-medium ring-2 ring-violet-400 sm:flex">
              <Grape className="mr-2 size-3.5 shrink-0 text-violet-600" />
              <span
                className={cn(
                  "pr-[3px]",
                  credits > 5 ? "text-green-600" : "text-red-500"
                )}
              >
                {credits}
              </span>
              /<span className="pl-[3px] text-violet-500">30</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer">
                  <AvatarImage src={user.imageUrl} alt="profile-pic" />
                  <AvatarFallback>
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-2 mt-2 w-56">
                <DropdownMenuLabel className="truncate">
                  <span className="font-medium">{user.fullName}</span>
                  <br />
                  <span className="font-semibold">
                    {user.emailAddresses[0].emailAddress}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center font-medium">
                    <Grape className="mr-2 size-4 shrink-0" />
                    <div className="flex w-full items-center justify-between">
                      <p>Credits</p>
                      <p className="rounded-2xl px-2 py-0.5 text-sm ring-2 ring-violet-400">
                        <span
                          className={cn(
                            "pr-[3px]",
                            credits > 5 ? "text-green-600" : "text-red-500"
                          )}
                        >
                          {credits}
                        </span>
                        /<span className="pl-[3px] text-violet-500">30</span>
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="font-medium">
                      <LayoutDashboard className="mr-2 size-4 shrink-0" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved" className="font-medium">
                      <Bookmark className="mr-2 size-4 shrink-0" />
                      <span>Saved</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/billing" className="font-medium">
                      <CreditCard className="mr-2 size-4 shrink-0" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer font-medium"
                >
                  <SignOutButton redirectUrl="/">
                    <div>
                      <LogOut className="mr-2 size-4 shrink-0" />
                      <span>Log out</span>
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        ) : (
          <Link
            href="/sign-in"
            className="relative inline-flex h-9 overflow-hidden rounded-full p-[2px] focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex size-full cursor-pointer items-center justify-center rounded-full px-3 py-1 font-medium backdrop-blur-3xl">
              <LogIn className="mr-2 size-4" />
              Log In
            </span>
          </Link>
        )}
      </aside>
    </header>
  );
}
