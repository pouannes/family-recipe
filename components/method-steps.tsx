export function MethodSteps({
  steps,
}: {
  steps: { number: number; text: string }[];
}) {
  return (
    <ol className="space-y-6">
      {steps.map((step) => (
        <li key={step.number} className="relative pl-12" style={{ lineHeight: 1.7 }}>
          <span className="absolute left-0 top-0 font-heading text-[28px] font-bold leading-none text-wheat">
            {step.number}
          </span>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
