import Fuse, { type IFuseOptions } from "fuse.js";
import type { Recipe } from "@/types/recipe";

export type SearchableRecipe = Omit<Recipe, "content">;

const fuseOptions: IFuseOptions<SearchableRecipe> = {
  keys: [
    { name: "title", weight: 4 },
    { name: "tags", weight: 3 },
    { name: "description", weight: 2 },
    { name: "ingredients.name", weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
};

export function createRecipeIndex(recipes: SearchableRecipe[]) {
  return new Fuse(recipes, fuseOptions);
}

export function searchRecipes(
  index: Fuse<SearchableRecipe>,
  query: string,
): SearchableRecipe[] {
  if (!query.trim()) return [];
  return index.search(query).map((result) => result.item);
}
