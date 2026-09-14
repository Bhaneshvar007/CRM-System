import LoginCard from "../../components/layout/LoginCard.jsx";
import globalconfig from "../../config/globalconfig.tsx";

export default function Login() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0e1a]">
      {/* Background image — replace src with your own asset */}
      <img
        src={globalconfig.loginbg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay so the card stays readable */}
      <div className="" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2 px-8 py-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
          C
        </div>
        <span className="text-lg font-semibold text-white">CRM</span>
      </div>

      {/* Card */}
      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <LoginCard />
      </div>
    </div>
  );
}