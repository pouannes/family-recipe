"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () =>
  navigator.platform.toUpperCase().includes("MAC");
const getServerSnapshot = () => false;

export function KbdShortcut() {
  const isMac = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <kbd className="rounded border border-wheat bg-sand/40 px-1.5 py-0.5 font-mono text-xs text-taupe">
      {isMac ? "⌘" : "Ctrl+"}K
    </kbd>
  );
}
