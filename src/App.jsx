import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact"; // 1. Import contact file

function App() {
  const [lang, setLang] = useState("EN");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "TH" : "EN"));
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-zinc-100 selection:bg-zinc-700 selection:text-white">
      <Navbar lang={lang} toggleLanguage={toggleLanguage} />
      <Home lang={lang} />
      <Experience lang={lang} />
      <Projects lang={lang} />

      {/* 2. Place contact section directly at the bottom */}
      <Contact lang={lang} />
    </div>
  );
}

export default App;
