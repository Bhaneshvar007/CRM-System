import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";



const inputFieldClass =
    "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

export default function RoleCreationForm({ onBack, onSubmit, onCancel }) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <div className="flex min-h-5xl items-center justify-center bg-slate-50 p-4">
            <div className="max-w-4xl w-full rounded-xl border border-slate-200 bg-white p-6 overflow-hidden">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <Link to="/settings/role-management/list">
                        <button
                            onClick={onBack}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                    </Link>
                    <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">
                        Add Role
                    </h2>
                </div>

                {/* Name / Code */}
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Role Name"
                            className={inputFieldClass}
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Code <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter Role Code"
                            className={inputFieldClass}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Description
                    </label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Enter Description"
                        rows={4}
                        className={`${inputFieldClass} resize-none`}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onSubmit?.({ name, code, desc })}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
                    >
                        Add Role
                    </button>
                    <Link to="/settings/role-management/list">
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