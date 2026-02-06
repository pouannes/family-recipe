export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  group: string;
}

export interface Recipe {
  title: string;
  slug: string;
  description?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  content: string;
}

export function groupIngredients(
  ingredients: Ingredient[],
): Record<string, Ingredient[]> {
  const groups: Record<string, Ingredient[]> = {};
  for (const ingredient of ingredients) {
    const group = ingredient.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(ingredient);
  }
  return groups;
}
