import { useState } from "react";
import { ArrowLeft, Camera, X, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


const selectFieldClass =
    "w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-16 text-sm text-slate-700 outline-none focus:border-accent focus:ring-1 focus:ring-accent";

const inputFieldClass =
    "w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-accent focus:ring-1 focus:ring-accent";

function ClearableSelect({ value, placeholder }) {
    return (
        <div className="relative">
            <select
                defaultValue={value || ""}
                className={selectFieldClass}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {value && <option value={value}>{value}</option>}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-slate-400">
                <X className="h-3.5 w-3.5 pointer-events-auto cursor-pointer hover:text-slate-600" />
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
}

export default function MyProfileForm() {
    const navigate = useNavigate();


    const [name, setName] = useState("Bhaneshvar Kshirsagar");
    const [phone, setPhone] = useState("93014-12986");

    return (
        <div className="flex min-h-5xl items-center justify-center bg-slate-50 p-4">
            <div className="max-w-4xl w-full rounded-xl border border-slate-200 bg-white p-6 overflow-hidden">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <h2 className="text-lg font-bold text-slate-900">My Profile</h2>
                </div>

                {/* Profile picture */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Profile Picture
                    </label>
                    <div className="relative h-20 w-20">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-900">
                            <User className="h-10 w-10 text-white" strokeWidth={1.5} />
                        </div>
                        <button className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center
           rounded-full bg-primary text-white ring-2 ring-white">
                            <Camera className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Name / Email */}
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputFieldClass}
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Email ID <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="kirti.tandulkar@cylsys.com"
                            disabled
                            className={`${inputFieldClass} cursor-not-allowed bg-slate-50 text-slate-400`}
                        />
                        {/* <p className="mt-1 text-xs text-slate-400">
                            Email address cannot be changed.
                        </p> */}
                    </div>
                </div>

                {/* Phone / Role */}
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Phone Number
                        </label>
                        <div className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
                            <button
                                type="button"
                                className="flex items-center gap-1 border-r border-slate-300 bg-slate-50 px-2.5 text-sm text-slate-600"
                            >
                                🇮🇳 <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                            <input
                                type="tel"
                                value={`+91 ${phone}`}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2.5 text-sm text-slate-700 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Role <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                            <select
                                defaultValue="Admin"
                                className={`${selectFieldClass} pr-9 text-slate-400`}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="User">User</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* Designation / Department */}
                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Designation <span className="text-danger">*</span>
                        </label>
                        <ClearableSelect value="General Manager IT" placeholder="Select Designation" />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Department <span className="text-danger">*</span>
                        </label>
                        <ClearableSelect value="Information Technology" placeholder="Select Department" />
                    </div>
                </div>



                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="rounded-lg bg-primary hover:bg-primary-hover px-5 py-2.5 text-sm font-semibold text-white">
                        Save Changes
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}