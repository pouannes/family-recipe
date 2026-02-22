import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  targetPath,
}: {
  locale: Locale;
  targetPath: string;
}) {
  const t = getDictionary(locale);

  return (
    <Link
      href={targetPath}
      className="font-heading text-sm font-semibold uppercase tracking-widest text-taupe transition-colors hover:text-terracotta"
    >
      {t.switchLocale}
    </Link>
  );
}
