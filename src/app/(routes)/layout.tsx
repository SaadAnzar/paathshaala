import Navbar from "@/components/Navbar";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="mt-14">{children}</div>
    </div>
  );
}
