import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { CommandMenu } from "@/components/command-menu";
import { toSearchable } from "@/lib/recipes";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const searchableRecipes = toSearchable(locale);

  return (
    <>
      {children}
      <CommandMenu recipes={searchableRecipes} locale={locale} />
    </>
  );
}
