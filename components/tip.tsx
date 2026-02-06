export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-6 border-l-4 border-terracotta bg-sand/30 py-3 pl-4 pr-3 italic text-espresso">
      {children}
    </aside>
  );
}
