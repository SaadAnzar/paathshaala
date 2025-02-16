import BackToTopButton from "@/components/tools/back-to-top-button";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BackToTopButton />
    </>
  );
}
