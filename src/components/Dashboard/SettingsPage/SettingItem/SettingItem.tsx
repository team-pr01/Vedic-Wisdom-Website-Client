import type { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";

type TSettingItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  hasAction?: boolean;
  actionLabel?: string;
  status?: "pending" | "completed" | "default";
  badge?: string;
  iconClassName?: string;
  variant?: "default" | "danger";
};

const SettingItem: React.FC<TSettingItemProps> = ({
  icon,
  title,
  description,
  onClick,
  hasAction,
  actionLabel,
  badge,
  iconClassName,
  variant = "default",
}) => {
  const isDanger = variant === "danger";

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
        isDanger
          ? "border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-300"
          : "border-neutral-20 bg-white hover:bg-neutral-10/5 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${
            isDanger ? "bg-red-100" : "bg-primary-10/10"
          } ${iconClassName || ""}`}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4
              className={`font-semibold ${
                isDanger ? "text-red-600" : "text-neutral-90"
              }`}
            >
              {title}
            </h4>
            {badge && (
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-60 mt-0.5">{description}</p>
        </div>
      </div>

      {hasAction && (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isDanger ? "text-red-600" : "text-primary-10"
            }`}
          >
            {actionLabel}
          </span>
          <FaChevronRight
            className={`text-xs ${isDanger ? "text-red-400" : "text-neutral-40"}`}
          />
        </div>
      )}
    </div>
  );
};

export default SettingItem;