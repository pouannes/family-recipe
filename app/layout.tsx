import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { headers } from "next/headers";
import { defaultLocale, type Locale } from "@/lib/i18n";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Family Recipes",
  description: "Our collection of family recipes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = (headerList.get("x-locale") as Locale) || defaultLocale;

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${sourceSerif.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
