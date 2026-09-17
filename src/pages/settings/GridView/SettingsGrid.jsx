import {
  Users,
  Unlock,
  Layers,
  ChevronDownCircle,
  Mail,
  Glasses,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const settingsItems = [
  { label: "User Management", icon: Users, route: "/UserManagement" },
  { label: "Change Password", icon: Unlock, route: "/change-password" },
  { label: "Roles-Privileges", icon: Layers, route: "/settings/roles-privileges" },
  { label: "Drop Down Master", icon: ChevronDownCircle, route: "/settings/dropdown-master" },
  { label: "Email Template", icon: Mail, route: "/settings/email-template" },
  { label: "Inventory", icon: Glasses, route: "/settings/inventory" },
];

export default function SettingsGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {settingsItems.map(({ label, icon: Icon, route }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-8"
        >
          <Icon className="h-12 w-12 text-slate-500" strokeWidth={1.5} />

          <button
            onClick={() => navigate(route)}
            className="mt-6 w-full rounded-md bg-primary py-2.5 text-sm font-bold tracking-wide text-white hover:opacity-90"
          >
            {label.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
}