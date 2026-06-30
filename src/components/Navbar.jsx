import { useState } from "react";
import { Menu, X, Globe, Lock } from "lucide-react";

// 1. Accept 'onAdminTrigger' and 'hideNavLinks' as arguments at the top
export const Navbar = ({
  lang,
  toggleLanguage,
  onAdminTrigger,
  hideNavLinks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    EN: { home: "Home", skills: "My Skills", contact: "Contact" },
    TH: { home: "หน้าแรก", skills: "ทักษะของฉัน", contact: "ติดต่อ" },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-b border-zinc-700/50 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#home"
          className="text-xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent hover:from-white hover:to-zinc-300 drop-shadow-md transition-all"
        >
          PORTFOLIO
        </a>

        {/* Desktop Navigation Links - Hidden when hideNavLinks is active */}
        {!hideNavLinks && (
          <div className="hidden md:flex items-center space-x-8 font-medium">
            {["home", "skills", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-zinc-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {content[lang][item]}
              </a>
            ))}
          </div>
        )}

        {/* Utility Actions Layer */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-linear-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-300 hover:text-white border border-zinc-600/40 shadow-inner transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Globe size={14} className="text-zinc-400" />
            <span className="text-xs font-bold tracking-wider">{lang}</span>
          </button>

          {/* 2. SECURE ADMIN ACCESS TRIGGER KEY (Only visible on main landing view) */}
          {!hideNavLinks && (
            <button
              onClick={() => onAdminTrigger?.()} // Optional chaining operator (?.) prevents runtime errors!
              className="p-2 rounded-md bg-zinc-800/40 border border-zinc-700/40 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-all cursor-pointer shadow-inner"
              title="Admin Access Panel"
            >
              <Lock size={14} />
            </button>
          )}

          {/* Mobile Menu Button - Hidden when hideNavLinks is active */}
          {!hideNavLinks && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white bg-zinc-800/50 border border-zinc-700/50 cursor-pointer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && !hideNavLinks && (
        <div className="md:hidden bg-neutral-900/95 border-b border-zinc-800 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {["home", "skills", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
              >
                {content[lang][item]}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
