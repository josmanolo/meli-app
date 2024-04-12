import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/SearchBar";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercado Libre",
  description: "Encuentra los mejores productos en Mercado Libre. Busca y descubre una amplia variedad de artículos en todas las categorías.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={figtree.className}>
        <SearchBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
