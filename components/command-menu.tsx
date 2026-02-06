"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  createRecipeIndex,
  searchRecipes,
  type SearchableRecipe,
} from "@/lib/search";

export function CommandMenu({ recipes }: { recipes: SearchableRecipe[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const index = useMemo(() => createRecipeIndex(recipes), [recipes]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = query.trim() ? searchRecipes(index, query) : recipes;

  function selectRecipe(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/recipes/${slug}`);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setQuery("");
      }}
      label="Search recipes"
      className="fixed inset-0 z-50"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 animate-fade-in bg-espresso/40"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div className="fixed inset-x-0 top-[20%] mx-auto w-full max-w-lg animate-scale-in rounded-lg border border-wheat bg-parchment shadow-lg">
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search recipes…"
          className="w-full border-b border-wheat bg-transparent px-4 py-3 text-espresso placeholder:text-taupe/60 focus:outline-none"
        />

        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-center italic text-taupe">
            No recipes found.
          </Command.Empty>

          {results.map((recipe) => (
            <Command.Item
              key={recipe.slug}
              value={recipe.title}
              onSelect={() => selectRecipe(recipe.slug)}
              className="cursor-pointer rounded-md px-3 py-2 data-[selected=true]:bg-sand data-[selected=true]:text-terracotta"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-semibold">{recipe.title}</span>
                {recipe.tags.length > 0 && (
                  <span className="inline-flex gap-1">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-terracotta/8 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-terracotta"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              {recipe.description && (
                <p className="mt-0.5 text-sm italic text-taupe">{recipe.description}</p>
              )}
            </Command.Item>
          ))}
        </Command.List>

        <div className="flex items-center justify-end gap-3 border-t border-wheat px-4 py-2 text-xs text-taupe">
          <span>
            <kbd className="rounded border border-wheat bg-sand/40 px-1.5 py-0.5 font-mono">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="rounded border border-wheat bg-sand/40 px-1.5 py-0.5 font-mono">
              ↵
            </kbd>{" "}
            select
          </span>
          <span>
            <kbd className="rounded border border-wheat bg-sand/40 px-1.5 py-0.5 font-mono">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </Command.Dialog>
  );
}
