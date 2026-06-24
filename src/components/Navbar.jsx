import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

// Accept lang and toggleLanguage as props
export const Navbar = ({ lang, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    EN: { home: "Home", skills: "My Skills", contact: "Contact" },
    TH: { home: "หน้าแรก", skills: "ทักษะของฉัน", contact: "ติดต่อ" },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-b border-zinc-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent hover:from-white hover:to-zinc-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all"
        >
          PORTFOLIO
        </a>

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

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-linear-to-b from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-300 hover:text-white border border-zinc-600/40 shadow-inner transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Globe size={14} className="text-zinc-400" />
            <span className="text-xs font-bold tracking-wider">{lang}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-md text-zinc-400 hover:text-white bg-zinc-800/50 border border-zinc-700/50 cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
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
