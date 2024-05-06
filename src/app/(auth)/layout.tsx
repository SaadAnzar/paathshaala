import BackButton from "@/components/back-button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen items-center justify-center">
      <BackButton className="fixed left-4 top-4" />
      {children}
    </div>
  );
}
