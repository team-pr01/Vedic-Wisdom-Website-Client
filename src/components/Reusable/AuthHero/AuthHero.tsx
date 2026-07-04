// components/Reusable/AuthHero/AuthHero.tsx
import Badge from "../Badge/Badge";
import Container from "../Container/Container";

interface AuthHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  className?: string;
}

const AuthHero = ({
  badge = "“ॐ नमः शिवाय”",
  title,
  titleHighlight,
  description,
  className = "",
}: AuthHeroProps) => {
  // Function to render title with highlight
  const renderTitle = () => {
    if (!titleHighlight) return title;

    const parts = title.split(titleHighlight);
    return parts.map((part, index, arr) => (
      <span key={index}>
        {part}
        {index < arr.length - 1 && (
          <span className="text-primary-10">{titleHighlight}</span>
        )}
      </span>
    ));
  };

  return (
    <div
      className={`py-23 bg-gradient-app-features font-Manrope relative h-110 overflow-hidden ${className}`}
    >
      <Container>
        <div className="flex flex-col items-center text-center gap-5">
          <Badge label={badge} />
          <h1 className="heading max-w-200">{renderTitle()}</h1>
          <p className="description max-w-2xl">{description}</p>
        </div>
      </Container>

      {/* Background Blobs */}
      <div className="size-134 rounded-full bg-primary-75/40 blur-[90px] absolute -bottom-56 -left-40"></div>
      <div className="size-134 rounded-full bg-primary-75/40 blur-[90px] absolute -bottom-56 -right-40"></div>
    </div>
  );
};

export default AuthHero;
