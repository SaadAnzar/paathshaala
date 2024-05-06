import DashboardNav from "@/components/dashboard-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col space-y-6 px-6 pb-8 pt-4">
      <DashboardNav />
      {children}
    </div>
  );
}
