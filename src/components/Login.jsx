import { useState } from "react";
import { Lock, Mail, ShieldAlert, Loader2 } from "lucide-react";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_BASE = rawApiUrl.endsWith("/") ? rawApiUrl : `${rawApiUrl}/`;

export const Login = ({ lang, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const content = {
    EN: {
      title: "Control Panel",
      subtitle: "Secure Administrator Gateway Authentication",
      lblEmail: "Admin Email",
      lblPass: "Access Password",
      btnEnter: "Authenticate Access",
      btnLoading: "Validating Handshake...",
    },
    TH: {
      title: "แผงควบคุมระบบ",
      subtitle: "การยืนยันตัวตนเกตเวย์ผู้ดูแลระบบที่ปลอดภัย",
      lblEmail: "อีเมลผู้ดูแลระบบ",
      lblPass: "รหัสผ่านเข้าถึงระบบ",
      btnEnter: "เข้าสู่ระบบ",
      btnLoading: "กำลังตรวจสอบข้อมูล...",
    },
  };

  const current = content[lang];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Points securely to your functional userLogin router endpoint
      const response = await fetch(`${API_BASE}api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Pass administrative document variables up to app state wrapper
        onLoginSuccess(result.data);
      } else {
        setErrorMessage(
          result.message || "Authentication credentials refused.",
        );
      }
    } catch {
      setErrorMessage("Network interface timeout. Connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-linear-to-b from-zinc-900/40 to-neutral-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Machine Head Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock size={20} className="text-zinc-400" />
          </div>
          <h2 className="text-xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
            {current.title}
          </h2>
          <p className="text-zinc-500 font-mono text-[10px] tracking-wider mt-1 uppercase">
            // {current.subtitle}
          </p>
        </div>

        {/* Form Terminal Block */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {errorMessage && (
            <div className="flex items-center space-x-2 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-400 text-xs font-mono">
              <ShieldAlert size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
              {current.lblEmail}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-zinc-400 block uppercase">
              {current.lblPass}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-neutral-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-hidden focus:border-zinc-500 transition-all font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-linear-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-200 hover:text-white font-bold text-xs tracking-widest py-3 rounded-xl border border-zinc-600/40 shadow-inner transition-all duration-200 active:scale-99 cursor-pointer uppercase disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin mt-0.5" />
                <span>{current.btnLoading}</span>
              </>
            ) : (
              <span>{current.btnEnter}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
