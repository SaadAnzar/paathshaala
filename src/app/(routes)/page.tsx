import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default async function IndexPage() {
  const user = await currentUser();

  return (
    <section className="size-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-violet-900 to-violet-400 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                PaathShaala
              </h1>
              <p className="mx-auto max-w-[600px] md:text-xl">
                Use this to make your education process easy. Fast, secure, and
                designed for modern education.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              {user ? (
                <Link href="/dashboard" className={buttonVariants()}>
                  Let&apos;s continue!
                </Link>
              ) : (
                <Link href="/sign-up" className={buttonVariants()}>
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
