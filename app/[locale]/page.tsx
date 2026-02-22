import { notFound } from "next/navigation";
import { locales, isLocale, getDictionary, otherLocale } from "@/lib/i18n";
import { RecipeSearch } from "@/components/recipe-search";
import { LanguageSwitcher } from "@/components/language-switcher";
import { toSearchable } from "@/lib/recipes";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.siteTitle,
    description: t.siteDescription,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const searchableRecipes = toSearchable(locale);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher
          locale={locale}
          targetPath={`/${otherLocale(locale)}`}
        />
      </div>
      <h1 className="mb-2 font-heading text-[48px] font-bold text-walnut">
        {t.siteTitle}
      </h1>
      <p className="mb-12 text-lg text-taupe">{t.siteDescription}</p>
      <RecipeSearch recipes={searchableRecipes} locale={locale} />
    </div>
  );
}
