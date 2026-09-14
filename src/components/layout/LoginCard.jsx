import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle sign in
  };

  return (
    <div  className="
          relative
          z-20
          w-full
          max-w-[460px]
          rounded-3xl
          bg-slate-500/5
          backdrop-blur-xl
          border border-white/50
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          px-10
          pt-8
          pb-10
        ">
      <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
      <p className="mt-1 text-sm text-white/50">
        Sign in to access your digital workspace
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-white/70"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm
               text-white placeholder-white/30 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-white/70"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white
               placeholder-white/30 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* <button
          type="submit"
          className="w-full rounded-lg bg-[#1D4ED8] py-2.5 text-sm font-semibold 
          text-white transition-colors hover:bg-primary-hover active:bg-primary-active"
        >
          Sign In
        </button>  */}

          <button
          type="submit"
          className="relative w-full overflow-hidden rounded-lg bg-primary py-2.5 text-sm
           font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:bg-primary-hover
            hover:shadow-[0_0_28px_rgba(59,130,246,0.75)] active:bg-primary-active"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          />
          Sign In
        </button>
       

        {/* <button
          type="submit"
          className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-all 
          bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-[length:200%_100%] bg-left
          hover:bg-right active:scale-[0.98]"
        >
          Sign In
        </button> */}
      </form>
    </div>
  );
}