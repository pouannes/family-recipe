import { recipes } from "#site/content";
import type { Locale } from "@/lib/i18n";
import type { SearchableRecipe } from "@/lib/search";

export function getRecipesByLocale(locale: Locale) {
  return recipes.filter((r) => r.locale === locale);
}

export function getRecipe(locale: Locale, slug: string) {
  return recipes.find((r) => r.locale === locale && r.slug === slug);
}

export function getTranslationSlug(
  locale: Locale,
  slug: string,
): string | null {
  const other = locale === "fr" ? "en" : "fr";
  const match = recipes.find((r) => r.locale === other && r.slug === slug);
  return match ? match.slug : null;
}

export function toSearchable(locale: Locale): SearchableRecipe[] {
  return getRecipesByLocale(locale).map((recipe) => {
    const { content, ...rest } = recipe;
    void content;
    return rest;
  });
}
