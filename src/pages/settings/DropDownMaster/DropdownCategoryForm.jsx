import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const inputFieldClass =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

export default function DropdownCategoryForm({ onBack, onSubmit, onCancel }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">
          Add Dropdown Category
        </h2>
      </div>

      {/* Code / Name */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Code <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className={inputFieldClass}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSubmit?.({ code, name })}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Add Category
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}