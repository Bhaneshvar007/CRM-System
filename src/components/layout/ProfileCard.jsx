import { User, Settings, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "View Profile", icon: User, route: "/profile" },
  { label: "Settings", icon: Settings, route: "/settings" },
  { label: "Change Password", icon: Lock, route: "/change-password" },
];

export default function ProfileCard({ onClose, onLogout }) {
  const navigate = useNavigate();

  const handleItemClick = (route) => {
    if (route) navigate(route);
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
      {menuItems.map(({ label, icon: Icon, route }) => (
        <button
          key={label}
          onClick={() => handleItemClick(route)}
          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
          {label}
        </button>
      ))}

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={handleLogoutClick}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
      >
        <LogOut className="h-4 w-4" strokeWidth={2} />
        Logout
      </button>
    </div>
  );
}