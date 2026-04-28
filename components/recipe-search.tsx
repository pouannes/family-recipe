"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  createRecipeIndex,
  searchRecipes,
  type SearchableRecipe,
} from "@/lib/search";
import { KbdShortcut } from "@/components/kbd-shortcut";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

type Filter = "all" | "sweet" | "savory";

export function RecipeSearch({
  recipes,
  locale,
}: {
  recipes: SearchableRecipe[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const index = useMemo(() => createRecipeIndex(recipes), [recipes]);
  const t = getDictionary(locale);

  const searched = query.trim() ? searchRecipes(index, query) : recipes;
  const results =
    filter === "all"
      ? searched
      : searched.filter((r) =>
          r.tags.includes(filter === "sweet" ? t.sweetTag : t.savoryTag),
        );

  const filterButton = (value: Filter, label: string) => (
    <button
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={
        filter === value
          ? "rounded-sm bg-terracotta px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-parchment"
          : "rounded-sm border border-wheat bg-sand/30 px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-taupe hover:text-espresso"
      }
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder={t.searchRecipes}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-wheat bg-sand/30 px-4 py-3 pr-16 text-espresso placeholder:text-taupe/60 focus:border-terracotta focus:outline-none"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <KbdShortcut />
        </span>
      </div>
      <div className="mb-10 flex gap-2">
        {filterButton("all", t.filterAll)}
        {filterButton("sweet", t.filterSweet)}
        {filterButton("savory", t.filterSavory)}
      </div>
      {results.length === 0 ? (
        <p className="text-center italic text-taupe">
          {t.noRecipesFound} &ldquo;{query}&rdquo;
        </p>
      ) : (
        <ul className="space-y-8">
          {results.map((recipe) => (
            <li key={recipe.slug}>
              <Link
                href={`/${locale}/recipes/${recipe.slug}`}
                className="group block"
              >
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
