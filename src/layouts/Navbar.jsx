import { Menu, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ProfileCard from "../components/layout/ProfileCard.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
      <div className="flex flex-1 items-center gap-4">
        <button className="text-slate-500 hover:text-slate-800">
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search analytics, metrics, or records..."
            className="w-full rounded-lg bg-slate-100 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right text-xs leading-tight">
          <p className="text-slate-500">
            Designation:{" "}
            <span className="font-semibold text-slate-700">
              General Manager IT
            </span>
          </p>
          <p className="font-semibold text-danger">ROLE: ADMIN</p>
        </div>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2"
          >
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt="Sarah Jenkins"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="text-left text-xs leading-tight">
              <p className="font-semibold text-slate-800">Sarah Jenkins</p>
              <p className="text-slate-400">sarah@technova.com</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-20 mt-2">
              <ProfileCard onClose={() => setOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}