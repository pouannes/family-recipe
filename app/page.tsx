import { recipes } from "#site/content";
import { RecipeSearch } from "@/components/recipe-search";
import type { SearchableRecipe } from "@/lib/search";

const searchableRecipes: SearchableRecipe[] = recipes.map((recipe) => {
  const { content, ...rest } = recipe;
  void content;
  return rest;
});

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="mb-2 font-heading text-[48px] font-bold text-walnut">
        Family Recipes
      </h1>
      <p className="mb-12 text-lg text-taupe">
        Our collection of family recipes.
      </p>
      <RecipeSearch recipes={searchableRecipes} />
    </div>
  );
}
