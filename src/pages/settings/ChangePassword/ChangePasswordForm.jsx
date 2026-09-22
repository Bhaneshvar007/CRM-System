import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";



function PasswordField({ label, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 pr-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ChangePasswordForm({ onBack, onSubmit, onCancel }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex min-h-5xl items-center justify-center bg-slate-50 p-4">
      <div className="max-w-3xl w-full rounded-xl border border-slate-200 bg-white p-6 overflow-hidden">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link to="/settings" className="text-slate-600 hover:text-slate-700">
            <button
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
        </div>

        <div className="space-y-5">
          <PasswordField
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />
          <PasswordField
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={setNewPassword}
          />
          <PasswordField
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={() =>
              onSubmit?.({ currentPassword, newPassword, confirmPassword })
            }
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Update Password
          </button>
          <Link to="/settings" className="text-slate-600 hover:text-slate-700">
            <button
              onClick={onCancel}
              className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}