import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { recipes } from "#site/content";
import { CommandMenu } from "@/components/command-menu";
import type { SearchableRecipe } from "@/lib/search";
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

const searchableRecipes: SearchableRecipe[] = recipes.map((recipe) => {
  const { content, ...rest } = recipe;
  void content;
  return rest;
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <body className="antialiased">
        {children}
        <CommandMenu recipes={searchableRecipes} />
      </body>
    </html>
  );
}
