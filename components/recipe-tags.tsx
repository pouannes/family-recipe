import Link from "next/link";

export function RecipeTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="rounded-sm bg-terracotta/8 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-widest text-terracotta transition-colors hover:bg-terracotta/15"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
