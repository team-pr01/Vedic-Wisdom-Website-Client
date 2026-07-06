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

const Breadcrumb = ({
  items,
  className = "",
  homeLabel = "Home",
  separator = <MdNavigateNext className="w-4 h-4 text-gray-400" />,
}: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center text-sm font-Manrope ${className}`}>
      <Link
        to="/"
        className="flex items-center gap-1 text-neutral-5 hover:text-primary-10 transition-colors"
      >
        <IoHomeOutline className="w-4 h-4" />
        {homeLabel}
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {separator}
          {item.path && !item.isActive ? (
            <Link
              to={item.path}
              className="text-neutral-50 hover:text-primary-10 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-5">{item?.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;