// components/Reusable/Breadcrumb/Breadcrumb.tsx
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  homeLabel?: string;
  separator?: React.ReactNode;
}

const MAX_LABEL_LENGTH = 10;

const truncateLabel = (label: string, max: number = MAX_LABEL_LENGTH) =>
  label.length > max ? `${label.slice(0, max)}...` : label;

const Breadcrumb = ({
  items,
  className = "",
  homeLabel = "Home",
  separator = <MdNavigateNext className="w-4 h-4 text-gray-400 shrink-0" />,
}: BreadcrumbProps) => {
  return (
    <nav
      className={`flex items-center text-sm font-Manrope whitespace-nowrap ${className}`}
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-neutral-50 hover:text-primary-10 transition-colors shrink-0"
      >
        <IoHomeOutline />
        {homeLabel}
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        // Truncate only the last item; keep earlier path items intact
        const displayLabel = isLast
          ? truncateLabel(item.label)
          : item.label;

        return (
          <div key={index} className="flex items-center shrink-0">
            {separator}
            {item.path && !item.isActive ? (
              <Link
                to={item.path}
                title={item.label} // full text on hover (desktop)
                className="text-neutral-50 hover:text-primary-10 transition-colors"
              >
                {displayLabel}
              </Link>
            ) : (
              <span title={item.label} className="text-primary-10">
                {displayLabel}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;