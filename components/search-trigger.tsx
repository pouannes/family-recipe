"use client";

import { KbdShortcut } from "@/components/kbd-shortcut";

export function SearchTrigger() {
  return (
    <button
      type="button"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true }),
        );
      }}
      className="flex items-center gap-2 rounded-md border border-wheat bg-sand/30 px-3 py-1.5 text-sm text-taupe/60 transition-colors hover:border-terracotta hover:text-taupe"
    >
      Search recipes…
      <KbdShortcut />
    </button>
  );
}
