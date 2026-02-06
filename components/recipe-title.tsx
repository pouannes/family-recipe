export function RecipeTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-[48px] font-bold leading-tight text-walnut">
        {title}
      </h1>
      {description && (
        <p className="mt-2 font-body text-lg italic text-taupe">
          {description}
        </p>
      )}
    </div>
  );
}
