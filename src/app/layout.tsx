import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AETHERIA™ Global | High-Ticket US & EU Direct-to-Consumer Flagship Store",
  description:
    "Next.js + Tailwind + Stripe + Klarna BNPL High-Ticket Cross-Border E-Commerce Platform engineered for US & European markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
