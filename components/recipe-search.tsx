"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  createRecipeIndex,
  searchRecipes,
  type SearchableRecipe,
} from "@/lib/search";
import { KbdShortcut } from "@/components/kbd-shortcut";

export function RecipeSearch({ recipes }: { recipes: SearchableRecipe[] }) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => createRecipeIndex(recipes), [recipes]);

  const results = query.trim() ? searchRecipes(index, query) : recipes;

  return (
    <>
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search recipes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-wheat bg-sand/30 px-4 py-3 pr-16 text-espresso placeholder:text-taupe/60 focus:border-terracotta focus:outline-none"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <KbdShortcut />
        </span>
      </div>
      {results.length === 0 ? (
        <p className="text-center italic text-taupe">
          No recipes found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <ul className="space-y-8">
          {results.map((recipe) => (
            <li key={recipe.slug}>
              <Link href={`/recipes/${recipe.slug}`} className="group block">
                <h2 className="font-heading text-2xl font-semibold text-walnut group-hover:text-terracotta">
                  {recipe.title}
                </h2>
                {recipe.description && (
                  <p className="mt-1 italic text-taupe">
                    {recipe.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-terracotta/8 px-2 py-0.5 font-heading text-xs font-semibold uppercase tracking-widest text-terracotta"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
