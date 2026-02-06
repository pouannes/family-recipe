import { notFound } from "next/navigation";
import { recipes } from "#site/content";
import { RecipeTitle } from "@/components/recipe-title";
import { RecipeMeta } from "@/components/recipe-meta";
import { RecipeTags } from "@/components/recipe-tags";
import { IngredientList } from "@/components/ingredient-list";
import { RecipeLayout } from "@/components/recipe-layout";
import { Divider } from "@/components/divider";
import { MDXContent } from "@/components/mdx-content";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} — Family Recipes`,
    description: recipe.description,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-4 py-10">
      <RecipeTitle title={recipe.title} description={recipe.description} />
      <RecipeMeta
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        servings={recipe.servings}
      />
      <Divider />
      <RecipeLayout
        sidebar={<IngredientList ingredients={recipe.ingredients} />}
      >
        <MDXContent code={recipe.content} />
      </RecipeLayout>
      <Divider />
      <RecipeTags tags={recipe.tags} />
    </div>
  );
}
