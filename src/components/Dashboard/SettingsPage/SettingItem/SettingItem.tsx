import React from "react";
import { FaCheckCircle, FaChevronRight, FaPaperPlane } from "react-icons/fa";

type TSettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  actionLabel?: string;
  hasAction?: boolean;
  status?: "pending" | "completed" | "default";
  badge?: string;
};

const SettingItem: React.FC<TSettingsItemProps> = ({
  icon,
  title,
  description,
  onClick,
  actionLabel = "Update",
  hasAction = false,
  status = "default",
  badge,
}) => {
  const statusColors = {
    pending: "text-accent-35 bg-accent-25",
    completed: "text-green-600 bg-green-50",
    default: "text-neutral-50 bg-neutral-20",
  };

  const statusIcons = {
    pending: <FaPaperPlane className="w-3 h-3" />,
    completed: <FaCheckCircle className="w-3 h-3" />,
    default: null,
  };
  return (
    <div
      className="flex items-center justify-between p-5 bg-white rounded-xl border border-neutral-75 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-30 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-Manrope font-semibold text-neutral-10 text-base">
              {title}
            </h3>
            {badge && (
              <span className="text-xs bg-primary-30 text-white px-2 py-0.5 rounded-full font-Manrope">
                {badge}
              </span>
            )}
          </div>
          <p className="font-Manrope text-neutral-50 text-sm">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {status !== "default" && (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-Manrope flex items-center gap-1.5 ${statusColors[status]}`}
          >
            {statusIcons[status]}
            {status === "pending" ? "Pending" : "Completed"}
          </span>
        )}
        {hasAction && (
          <span className="text-primary-30 font-Manrope text-sm font-medium group-hover:underline">
            {actionLabel}
          </span>
        )}
        <FaChevronRight className="w-4 h-4 text-neutral-60 group-hover:text-primary-30 transition-colors" />
      </div>
    </div>
  );
};

export default SettingItem;
