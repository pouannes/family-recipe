import * as runtime from "react/jsx-runtime";
import { SectionHeader } from "@/components/section-header";
import { Divider } from "@/components/divider";
import { Tip } from "@/components/tip";

const sharedComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <SectionHeader>{children}</SectionHeader>
  ),
  hr: () => <Divider />,
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed text-espresso">{children}</p>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="method-steps">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  Tip,
};

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, React.ComponentType>;
}) {
  const fn = new Function(code);
  const Component = fn({ ...runtime }).default;
  const mergedComponents = { ...sharedComponents, ...components };
  return Component({ components: mergedComponents });
}
