export function RecipeLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr]">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
