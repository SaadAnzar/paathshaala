"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function BackButton({ className }: { className: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={cn("h-7 px-2.5", className)}
    >
      <ArrowLeft className="mr-1 size-3.5" />
      Back
    </Button>
  );
}
