import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Loader2 } from "lucide-react";

function App() {
  const [lang, setLang] = useState("EN");
  const [adminUser, setAdminUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true); // 🧠 Tracks background verification handshake

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "TH" : "EN"));
  };

  // 1. AUTOMATIC BACKGROUND RE-AUTHENTICATION LOOP
  useEffect(() => {
    const checkPersistedAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/me", {
          method: "GET",
          credentials: "include", // Essential to pass the cookie for inspection
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setAdminUser(result.data); // Re-hydrates state with database admin records automatically
        }
      } catch {
        //console.log("No persistent administrative session active:", error); - comment out to prevent error show on console
      } finally {
        setIsInitializing(false); // Synchronization phase finished
      }
    };

    checkPersistedAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setAdminUser(null);
      setShowLogin(false);
    } catch (error) {
      console.error("Logout runtime interface fault:", error);
    }
  };

  // 2. LOADING SPLASH: Prevents flickering or layout flashing while reading cookies
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-zinc-500 font-mono text-xs">
        <Loader2 size={16} className="animate-spin text-zinc-600 mr-2" />
        <span>// INTIALIZING MACHINE LAYERS...</span>
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
