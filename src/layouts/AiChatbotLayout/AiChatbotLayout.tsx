import { Outlet } from "react-router-dom";

const AiChatbotLayout = () => {
  return (
    <div className="flex w-full h-screen bg-neutral-90 p-4 pl-0">
      <Outlet />
    </div>
  );
};

export default AiChatbotLayout;
