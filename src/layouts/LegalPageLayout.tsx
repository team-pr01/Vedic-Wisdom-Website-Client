import type { ReactNode } from "react";
import Container from "../components/Reusable/Container/Container";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description?: string;
  children: ReactNode;
}

const LegalPageLayout = ({
  title,
  lastUpdated,
  description,
  children,
}: LegalPageLayoutProps) => {
  return (
    <div className="font-Manrope min-h-screen bg-linear-to-b from-neutral-10/5 to-white">
      {/* Header */}
      <div className="bg-neutral-45 border-b border-neutral-20">
        <Container>
          <div className="py-12 md:py-16 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-90">
              {title}
            </h1>
            {description && (
              <p className="text-neutral-60 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                {description}
              </p>
            )}
            <p className="text-xs text-neutral-40 mt-4">
              Last Updated:{" "}
              <span className="font-medium text-neutral-60">{lastUpdated}</span>
            </p>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="py-10 md:py-14 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-neutral-20 shadow-sm p-6 md:p-10 lg:p-12 space-y-8">
            {children}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-xs text-neutral-40">
              If you have any questions, contact us at{" "}
              <a
                href="mailto:support@vedicwisdom.com"
                className="text-primary-10 hover:underline font-medium"
              >
                support@vedicwisdom.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LegalPageLayout;
