"use client";

import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const searchParams = useSearchParams();

  const redirectUrl =
    searchParams.get("redirect_url") ||
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/tools`;

  return (
    <SignUp
      forceRedirectUrl={`/api/auth/callback?redirect_url=${redirectUrl}`}
    />
  );
}
