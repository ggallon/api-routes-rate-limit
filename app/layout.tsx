import "./globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
          {children}
        </div>
      </body>
    </html>
  );
}
