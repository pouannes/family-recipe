export function RecipeLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr]">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
