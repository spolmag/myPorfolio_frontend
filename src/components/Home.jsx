// Direct Cloudinary URL
const profileImg =
  "https://res.cloudinary.com/de0vx5pt4/image/upload/v1782277860/suttipong_polmag_vsdewj.jpg";

export const Home = ({ lang }) => {
  const homeContent = {
    EN: {
      role: "Systems & Software Engineer",
      dev: "Developer",
      org: "Organization Management",
      av: "Audio-Visual Systems Engineer",
      tech: "Technician Supply",
      skills: {
        dev: [
          "JavaScript",
          "Express",
          "Database",
          "SQL",
          "HTML",
          "CSS/Tailwind",
          "React",
        ],
        org: ["Job pipeline", "SOP", "KPI", "5S"],
        av: ["Touring", "Installed", "Event"],
        tech: ["Network", "IOT", "MEP"],
      },
    },
    TH: {
      role: "วิศวกรระบบและซอฟต์แวร์",
      dev: "นักพัฒนาซอฟต์แวร์ (Developer)",
      org: "การบริหารจัดการองค์กร",
      av: "วิศวกรระบบภาพและเสียง (Audio-Visual)",
      tech: "ฝ่ายเทคนิคและระบบสนับสนุน",
      skills: {
        dev: [
          "JavaScript",
          "Express",
          "ฐานข้อมูล (Database)",
          "SQL",
          "HTML",
          "CSS/Tailwind",
          "React",
        ],
        org: [
          "การบริหารจัดการงาน (Job pipeline)",
          "ขั้นตอนการปฏิบัติงานมาตรฐาน (SOP)",
          "ดัชนีชี้วัดผลงาน (KPI)",
          "สะสาง สะดวก สะอาด สุขลักษณะ สร้างนิสัย (5S)",
        ],
        av: [
          "งานคอนเสิร์ต/ทัวร์ริ่ง (Touring)",
          "งานติดตั้งระบบถาวร (Installed)",
          "งานกิจกรรม/อีเวนต์ (Event)",
        ],
        tech: [
          "ระบบเครือข่าย (Network)",
          "ระบบอินเทอร์เน็ตในทุกสิ่ง (IOT)",
          "ระบบวิศวกรรมอาคาร (MEP)",
        ],
      },
    },
  };

  const current = homeContent[lang];

  return (
    <section
      id="home"
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Profile Card */}
        <div className="lg:col-span-4 bg-linear-to-b from-zinc-800/40 to-neutral-900/60 border border-zinc-700/40 rounded-2xl p-6 shadow-[0_10px_50px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col items-center text-center">
          <div className="relative w-44 h-44 rounded-full p-1 bg-linear-to-tr from-zinc-600 via-zinc-400 to-zinc-700 shadow-xl mb-6">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-900">
              <img
                src={profileImg}
                alt="Suttipong Polmag"
                className="w-full h-full object-cover brightness-95"
              />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-wide bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent drop-shadow-md">
            SUTTIPONG POLMAG
          </h1>
          <p className="text-zinc-400 text-sm font-semibold tracking-widest mt-1 uppercase">
            {current.role}
          </p>
          <div className="w-12 h-0.5 bg-zinc-500 my-4 shadow-sm" />

          {/* Industrial Contact Block */}
          <div className="w-full text-left space-y-3 text-xs font-mono tracking-wide text-zinc-400 bg-neutral-950/40 p-4 rounded-xl border border-zinc-800/80">
            <p>
              <span className="text-zinc-500 font-bold">MOBILE:</span> (66)
              89-5181958
            </p>
            <p>
              <span className="text-zinc-500 font-bold">EMAIL:</span>{" "}
              spolmag@gmail.com
            </p>
            <p>
              <span className="text-zinc-500 font-bold">LINE:</span>{" "}
              <a
                href="https://line.me/ti/p/eyqs6bLYec"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-white underline break-all"
              >
                https://line.me/ti/p/eyqs6bLYec
              </a>
            </p>
            <p>
              <span className="text-zinc-500 font-bold">GITHUB:</span>{" "}
              <a
                href="https://github.com/spolmag"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-white underline break-all"
              >
                https://github.com/spolmag
              </a>
            </p>
            <p>
              <span className="text-zinc-500 font-bold">LINKEDIN:</span>{" "}
              <a
                href="https://www.linkedin.com/in/suttipong-polmag-7898ba2a4/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-white underline break-all block"
              >
                /suttipong-polmag
              </a>
            </p>
            <p>
              <span className="text-zinc-500 font-bold">YOB:</span> 1967
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Skills Dashboard Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Panel 1: Developer */}
          <div className="bg-linear-to-b from-zinc-800/20 to-neutral-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-600/40 transition-all duration-300 group">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-2 mb-3 group-hover:text-white transition-colors tracking-wide">
              {current.dev}
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm text-zinc-400">
              {current.skills.dev.map((skill) => (
                <li key={skill} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel 2: Organization Management */}
          <div className="bg-linear-to-b from-zinc-800/20 to-neutral-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-600/40 transition-all duration-300 group">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-2 mb-3 group-hover:text-white transition-colors tracking-wide">
              {current.org}
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {current.skills.org.map((skill) => (
                <li key={skill} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel 3: Audio-Visual Systems Engineer */}
          <div className="bg-linear-to-b from-zinc-800/20 to-neutral-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-600/40 transition-all duration-300 group">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-2 mb-3 group-hover:text-white transition-colors tracking-wide">
              {current.av}
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {current.skills.av.map((skill) => (
                <li key={skill} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel 4: Technician Supply */}
          <div className="bg-linear-to-b from-zinc-800/20 to-neutral-900/40 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-600/40 transition-all duration-300 group">
            <h3 className="text-lg font-bold text-zinc-200 border-b border-zinc-800 pb-2 mb-3 group-hover:text-white transition-colors tracking-wide">
              {current.tech}
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {current.skills.tech.map((skill) => (
                <li key={skill} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
