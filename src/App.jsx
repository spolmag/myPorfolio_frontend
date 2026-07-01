import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Loader2 } from "lucide-react";

// 🧠 1. FIX: Bulletproof URL trailing slash normalization layer!
const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_BASE = rawApiUrl.endsWith("/") ? rawApiUrl : `${rawApiUrl}/`;

function App() {
  const [lang, setLang] = useState("EN");
  const [adminUser, setAdminUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "TH" : "EN"));
  };

  // 1. AUTOMATIC BACKGROUND RE-AUTHENTICATION LOOP
  useEffect(() => {
    const checkPersistedAuth = async () => {
      try {
        // 🧠 2. FIX: Redirected securely from '/api/contact' to your real '/api/user/me' session router check!
        const response = await fetch(`${API_BASE}api/user/me`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setAdminUser(result.data);
        }
      } catch {
        // Safe empty catch block handles visitor page entry cleanly without throwing red traces!
      } finally {
        setIsInitializing(false);
      }
    };

    checkPersistedAuth();
  }, []);

  const handleLogout = async () => {
    try {
      // 🧠 3. FIX: Swapped hardcoded localhost for the global cloud network host address variable!
      await fetch(`${API_BASE}api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      setAdminUser(null);
      setShowLogin(false);
    } catch (error) {
      console.error("Logout runtime interface fault:", error);
    }
  };

  // 2. LOADING SPLASH: Prevents layout flashing while reading cookies on page boot
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-zinc-500 font-mono text-xs">
        <Loader2 size={16} className="animate-spin text-zinc-600 mr-2" />
        <span>// INITIALIZING MACHINE LAYERS...</span>
      </div>
    );
  }

  // Condition 1: Logged in View Panel
  if (adminUser) {
    return (
      <div className="bg-neutral-950 min-h-screen text-zinc-100">
        <Navbar
          lang={lang}
          toggleLanguage={toggleLanguage}
          hideNavLinks={true}
        />
        <Dashboard
          lang={lang}
          adminUser={adminUser}
          onLogout={handleLogout}
          onAdminUserUpdate={(updatedData) => setAdminUser(updatedData)}
        />
      </div>
    );
  }

  // Condition 2: Login Gate Terminal
  if (showLogin) {
    return (
      <div className="bg-neutral-950 min-h-screen text-zinc-100">
        <Navbar
          lang={lang}
          toggleLanguage={toggleLanguage}
          hideNavLinks={true}
          onAdminTrigger={() => setShowLogin(false)}
        />
        <Login
          lang={lang}
          onLoginSuccess={(userData) => setAdminUser(userData)}
        />
      </div>
    );
  }

  // Condition 3: Default Visitor Landing
  return (
    <div className="bg-neutral-950 min-h-screen text-zinc-100 selection:bg-zinc-700 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar
          lang={lang}
          toggleLanguage={toggleLanguage}
          onAdminTrigger={() => setShowLogin(true)}
        />
        <Home lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </div>
      <footer className="w-full py-6 px-4 bg-neutral-950 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 max-w-6xl mx-auto">
        <p>
          © {new Date().getFullYear()} SUTTIPONG POLMAG. ALL RIGHTS RESERVED.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="hover:text-zinc-400 hover:underline transition-colors mt-2 sm:mt-0 cursor-pointer"
        >
          // SYS_ADMIN_PORTAL
        </button>
      </footer>
    </div>
  );
}

export default App;
