import React, { useState, type ReactNode } from "react";
import { FaUserEdit, FaEnvelope, FaLock, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ChangePassword from "../../../components/Dashboard/SettingsPage/ChangePassword/ChangePassword";
import SettingItem from "../../../components/Dashboard/SettingsPage/SettingItem/SettingItem";

type TSettingItemType = {
  id: string | number;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  hasAction?: boolean;
  actionLabel?: string;
  status?: "pending" | "completed" | "default";
  badge?: string;
  iconClassName?: string;
};

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleEmailUs = () => {
    window.location.href = "mailto:support@example.com";
  };

  const settingsItems: TSettingItemType[] = [
    {
      id: 1,
      icon: <FaUserEdit className="w-5 h-5" />,
      title: "Change Personal Info",
      description: "Update your name, email, and phone number",
      onClick: () => {
        navigate("/dashboard/edit-profile");
      },
      hasAction: true,
      actionLabel: "Edit",
      status: "completed",
    },
    {
      id: 2,
      icon: <FaLock className="w-5 h-5" />,
      title: "Change Password",
      description: "Update your password to keep your account secure",
      onClick: () => setIsChangePasswordModalOpen(true),
      hasAction: true,
      actionLabel: "Change",
      badge: "Recommended",
    },
    {
      id: 3,
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email Us",
      description: "Send us an email for support or inquiries",
      onClick: handleEmailUs,
      hasAction: true,
      actionLabel: "Send",
    },
    {
      id: 4,
      icon: <FaWhatsapp className="w-5 h-5 text-green-500" />,
      title: "WhatsApp",
      description: "Chat with us on WhatsApp for quick support",
      onClick: handleWhatsApp,
      hasAction: true,
      actionLabel: "Chat",
      iconClassName: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <DashboardHeading
        title="Settings"
        description="Manage your account settings and preferences"
      />

      {/* Settings Grid */}
      <div className="max-w-4xl mx-auto space-y-4 mt-8">
        {settingsItems.map((item) => (
          <SettingItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={item.onClick}
            hasAction={item.hasAction}
            actionLabel={item.actionLabel}
            status={item.status}
            badge={item.badge}
          />
        ))}
      </div>

      {/* Change Password Modal */}
      <ChangePassword
        isModalOpen={isChangePasswordModalOpen}
        setIsModalOpen={setIsChangePasswordModalOpen}
      />
    </div>
  );
};

export default Settings;
