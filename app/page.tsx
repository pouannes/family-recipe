import Link from "next/link";
import { recipes } from "#site/content";

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="mb-2 font-heading text-[48px] font-bold text-walnut">
        Family Recipes
      </h1>
      <p className="mb-12 text-lg text-taupe">
        Our collection of family recipes.
      </p>
      <ul className="space-y-8">
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/recipes/${recipe.slug}`} className="group block">
              <h2 className="font-heading text-2xl font-semibold text-walnut group-hover:text-terracotta">
                {recipe.title}
              </h2>
              {recipe.description && (
                <p className="mt-1 italic text-taupe">{recipe.description}</p>
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
    </div>
  );
}
