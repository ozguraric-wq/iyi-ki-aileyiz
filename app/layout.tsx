import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İyi Ki Aileyiz | Animasyon Projesi",
  description:
    "6–9 yaş çocukları için güvenli aile iletişimini olumlu davranış modelleriyle anlatan 15 bölümlük animasyon kamu spotu serisi.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
