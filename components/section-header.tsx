export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b-2 border-terracotta pb-2 font-heading text-[22px] font-semibold text-walnut">
      {children}
    </h2>
  );
}
