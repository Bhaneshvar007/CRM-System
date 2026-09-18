import { useState } from "react";
import { ArrowLeft, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";



const inputFieldClass =
    "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const selectFieldClass =
    "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const moduleOptions = [
    "User Management",
    "Role Management",
    "Quotes & Deals",
    "Inventory",
    "Client Database",
    "Performance",
];

export default function FormModuleForm({ onBack, onSubmit, onCancel }) {
    const [formName, setFormName] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <div className="flex min-h-5xl items-center justify-center bg-slate-50 p-4">
            <div className="max-w-4xl w-full rounded-xl border border-slate-200 bg-white p-6 overflow-hidden">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <Link to="/settings/form-module/list">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                    </Link>
                    <h2 className="text-lg font-bold uppercase tracking-wide text-slate-900">
                        Add Form Module
                    </h2>
                </div>

                {/* Form Name / Module Name */}
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Form Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Enter Form Name"
                            className={inputFieldClass}
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Module Name <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                                className={selectFieldClass}
                            >
                                <option value="" disabled>
                                    Select Module
                                </option>
                                {moduleOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-slate-400">
                                <X
                                    onClick={() => setModuleName("")}
                                    className="h-3.5 w-3.5 pointer-events-auto cursor-pointer hover:text-slate-600"
                                />
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
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
                        onClick={() => onSubmit?.({ formName, moduleName, desc })}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
                    >
                        Add Form Module
                    </button>
                    <Link to="/settings/form-module/list">
                        <button className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}