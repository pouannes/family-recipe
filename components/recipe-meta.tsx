import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

function formatTime(minutes: number, locale: Locale): string {
  const t = getDictionary(locale);
  if (minutes < 60) return `${minutes} ${t.min}`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} ${t.hr}`;
  return `${hours} ${t.hr} ${remaining} ${t.min}`;
}

export function RecipeMeta({
  prepTime,
  cookTime,
  servings,
  locale,
}: {
  prepTime: number;
  cookTime: number;
  servings: number;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  return (
    <div className="mb-8 flex flex-wrap gap-8">
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          {t.prep}{" "}
        </span>
        <span className="text-taupe">{formatTime(prepTime, locale)}</span>
      </div>
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          {t.cook}{" "}
        </span>
        <span className="text-taupe">{formatTime(cookTime, locale)}</span>
      </div>
      <div>
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-terracotta">
          {t.serves}{" "}
        </span>
        <span className="text-taupe">{servings}</span>
      </div>
    </div>
  );
}
