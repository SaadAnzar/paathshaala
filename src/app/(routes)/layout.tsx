import Navbar from "@/components/navbar";

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
