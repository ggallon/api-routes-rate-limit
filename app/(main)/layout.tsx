import Footer from "./components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        {children}
      </main>
      <Footer />
    </>
  );
}
