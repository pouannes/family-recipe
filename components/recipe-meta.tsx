function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} hr`;
  return `${hours} hr ${remaining} min`;
}

export function RecipeMeta({
  prepTime,
  cookTime,
  servings,
}: {
  prepTime: number;
  cookTime: number;
  servings: number;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-8">
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          Prep{" "}
        </span>
        <span className="text-taupe">{formatTime(prepTime)}</span>
      </div>
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          Cook{" "}
        </span>
        <span className="text-taupe">{formatTime(cookTime)}</span>
      </div>
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          Serves{" "}
        </span>
        <span className="text-taupe">{servings}</span>
      </div>
    </div>
  );
}
