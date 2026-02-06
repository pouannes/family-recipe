import { groupIngredients } from "@/types/recipe";
import type { Ingredient } from "@/types/recipe";

export function IngredientList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const groups = groupIngredients(ingredients);

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-3 font-heading text-xs font-semibold uppercase tracking-[3px] text-terracotta">
            {group}
          </h3>
          <ul className="space-y-0">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between border-b border-dotted border-wheat py-2"
              >
                <span className="text-espresso">{item.name}</span>
                <span className="ml-4 shrink-0 italic text-taupe">
                  {item.quantity} {item.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
