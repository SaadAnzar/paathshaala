import "./globals.css";

import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Paathshaala",
    template: `%s | Paathshaala`,
  },
  description:
    "Paathshaala is a digital school which leverages AI to make education easy.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("font-sans", fontSans.variable)}>
          {children}
          <Toaster richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
