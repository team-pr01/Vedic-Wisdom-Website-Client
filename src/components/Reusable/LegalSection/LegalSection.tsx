import type { ReactNode } from "react";

interface LegalSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

const LegalSection = ({ number, title, children }: LegalSectionProps) => {
  return (
    <section className="scroll-mt-24">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-primary-10/10 text-primary-10 flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-neutral-90 pt-1">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-11 text-neutral-60 text-sm md:text-base leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
};

export default LegalSection;