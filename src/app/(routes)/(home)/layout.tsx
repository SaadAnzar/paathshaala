import DashboardNav from "@/components/dashboard-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col space-y-4 px-6 pb-8 pt-2">
      <DashboardNav />
      {children}
    </div>
  );
}
