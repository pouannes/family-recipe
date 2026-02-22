export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  fr: {
    siteTitle: "Recettes de Famille",
    siteDescription: "Notre collection de recettes de famille.",
    allRecipes: "Toutes les recettes",
    searchRecipes: "Chercher une recette\u2026",
    noRecipesFound: "Aucune recette trouv\u00e9e",
    prep: "Pr\u00e9p",
    cook: "Cuisson",
    serves: "Portions",
    ingredients: "Ingr\u00e9dients",
    navigate: "naviguer",
    select: "s\u00e9lectionner",
    close: "fermer",
    switchLocale: "English",
    recipeNotFound: "Recette introuvable",
    hr: "h",
    min: "min",
  },
  en: {
    siteTitle: "Family Recipes",
    siteDescription: "Our collection of family recipes.",
    allRecipes: "All recipes",
    searchRecipes: "Search recipes\u2026",
    noRecipesFound: "No recipes found",
    prep: "Prep",
    cook: "Cook",
    serves: "Serves",
    ingredients: "Ingredients",
    navigate: "navigate",
    select: "select",
    close: "close",
    switchLocale: "Fran\u00e7ais",
    recipeNotFound: "Recipe not found",
    hr: "hr",
    min: "min",
  },
} as const;

type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
