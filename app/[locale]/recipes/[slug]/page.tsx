import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "#site/content";
import { isLocale, getDictionary, otherLocale } from "@/lib/i18n";
import { getRecipe, getTranslationSlug } from "@/lib/recipes";
import { RecipeTitle } from "@/components/recipe-title";
import { RecipeMeta } from "@/components/recipe-meta";
import { RecipeTags } from "@/components/recipe-tags";
import { IngredientList } from "@/components/ingredient-list";
import { RecipeLayout } from "@/components/recipe-layout";
import { Divider } from "@/components/divider";
import { MDXContent } from "@/components/mdx-content";
import { SearchTrigger } from "@/components/search-trigger";
import { LanguageSwitcher } from "@/components/language-switcher";

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    locale: recipe.locale,
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const recipe = getRecipe(locale, slug);
  if (!recipe) return {};
  const t = getDictionary(locale);
  return {
    title: `${recipe.title} — ${t.siteTitle}`,
    description: recipe.description,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const recipe = getRecipe(locale, slug);
  if (!recipe) notFound();

  const t = getDictionary(locale);
  const other = otherLocale(locale);
  const translationSlug = getTranslationSlug(locale, slug);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-10">
      <nav className="mb-6 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-heading text-sm font-semibold uppercase tracking-widest text-taupe transition-colors hover:text-terracotta"
        >
          &larr; {t.allRecipes}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher
            locale={locale}
            targetPath={
              translationSlug
                ? `/${other}/recipes/${translationSlug}`
                : `/${other}`
            }
          />
          <SearchTrigger label={t.searchRecipes} />
        </div>
      </nav>
      <RecipeTitle title={recipe.title} description={recipe.description} />
      <RecipeMeta
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        servings={recipe.servings}
        locale={locale}
      />
      <Divider />
      <RecipeLayout
        sidebar={<IngredientList ingredients={recipe.ingredients} />}
      >
        <MDXContent code={recipe.content} />
      </RecipeLayout>
      <Divider />
      <RecipeTags tags={recipe.tags} locale={locale} />
    </div>
  );
}
