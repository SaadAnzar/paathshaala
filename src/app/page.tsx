import Link from "next/link";
import { LogIn, School } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] flex h-16 items-center justify-between px-4 py-2 backdrop-blur-lg sm:px-8">
        <div className="inline-flex items-center justify-center">
          <School className="mr-2 size-5 text-violet-600" strokeWidth={2.5} />
          <h1 className="bg-gradient-to-r from-violet-900 to-violet-400 bg-clip-text text-2xl font-bold tracking-tighter text-transparent">
            PaathShaala
          </h1>
        </div>
        <Link href="/sign-up" className={buttonVariants()}>
          Get Started
          <LogIn className="ml-2 size-4" />
        </Link>
      </header>
      {/* <Navbar /> */}
      <section className="size-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="bg-gradient-to-r from-violet-900 to-violet-400 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                  PaathShaala
                </h1>
                <p className="mx-auto max-w-[600px] md:text-xl">
                  Use this to make your education process easy. Fast, secure,
                  and designed for modern education.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/sign-in" className={buttonVariants()}>
                  Welcome Back!
                  {/* <ArrowRight className="ml-2 size-4" /> */}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
