import type { ComponentPropsWithoutRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { Divider } from "@/components/divider";
import { Tip } from "@/components/tip";

type MDXComponents = Record<
  string,
  (props: ComponentPropsWithoutRef<"div">) => React.ReactNode
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <SectionHeader>{children}</SectionHeader>,
    hr: () => <Divider />,
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-espresso">{children}</p>
    ),
    ol: ({ children }) => <ol className="method-steps">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    Tip: ({ children }) => <Tip>{children}</Tip>,
    ...components,
  };
}
