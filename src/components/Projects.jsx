import { ExternalLink, Code, Video } from "lucide-react";

// Direct Cloudinary URLs
const meetingRoomImg =
  "https://res.cloudinary.com/de0vx5pt4/image/upload/v1782277743/meetingRoomIO_hkwc9c.jpg";
const penguinVideo =
  "https://res.cloudinary.com/de0vx5pt4/video/upload/v1782277956/penquinVilla_k8m6kn.mov";

export const Projects = ({ lang }) => {
  const content = {
    EN: {
      title: "Featured Engineering Projects",
      subtitle: "Software Development & Audio-Visual Solutions",
      softwareTitle: "Web Application Projects",
      avTitle: "Audio-Visual & Systems Engineering",
      btnLive: "View Live App",
      softwareProjects: [
        {
          title: "Full-Stack E-Commerce Platform",
          description:
            "A responsive web application project featuring product browsing, state management, and modern UI flows.",
          url: "https://vercel.app",
          tags: ["React", "Tailwind CSS", "Vercel", "State Management"],
        },
        {
          title: "SPX Transport Logistics Hub",
          description:
            "Internal portal and operational workspace interface tracking logistics pipelines and transportation data workflows.",
          url: "https://google.com",
          tags: [
            "System Workspace",
            "Operations",
            "Data Hub",
            "Logistics Tool",
          ],
        },
      ],
      avProjects: [
        {
          type: "video",
          source: penguinVideo,
          title: "Touring / Concert Production (Penguin Villa)",
          tags: ["Live Sound", "FOH", "Stage Monitor", "Lighting & Visuals"],
        },
        {
          type: "image",
          source: meetingRoomImg,
          title: "System Integration & Permanent Installation",
          tags: ["Analog / Digital", "Dante AV Network", "Staff Training"],
        },
      ],
    },
    TH: {
      title: "ผลงานและโปรเจกต์ที่โดดเด่น",
      subtitle: "การพัฒนาซอฟต์แวร์ และโซลูชันระบบภาพและเสียง",
      softwareTitle: "โครงการพัฒนาเว็บแอปพลิเคชัน (Web Applications)",
      avTitle: "วิศวกรรมระบบภาพและเสียง (Audio-Visual Systems)",
      btnLive: "เข้าชมหน้าแอปจริง",
      softwareProjects: [
        {
          title: "แพลตฟอร์มระบบอีคอมเมิร์ซ (E-Commerce)",
          description:
            "เว็บแอปพลิเคชันรองรับการเลือกซื้อสินค้า จัดการสถานะตระกร้าสินค้า และโครงสร้าง UI หน้าบ้านที่ทันสมัย",
          url: "https://vercel.app",
          tags: ["React", "Tailwind CSS", "Vercel", "State Management"],
        },
        {
          title: "ศูนย์ข้อมูลโลจิสติกส์ SPX Transport",
          description:
            "พอร์ทัลภายในและอินเตอร์เฟซพื้นที่ทำงานเพื่อติดตามสายงานโลจิสติกส์และเวิร์กโฟลว์ข้อมูลการขนส่ง",
          url: "https://google.com",
          tags: [
            "System Workspace",
            "Operations",
            "Data Hub",
            "Logistics Tool",
          ],
        },
      ],
      avProjects: [
        {
          type: "video",
          source: penguinVideo,
          title: "งานคอนเสิร์ต และ ทัวร์ริ่ง (Penguin Villa Live)",
          tags: ["ระบบเสียงสด", "มอนิเตอร์เวที", "ระบบไฟและภาพแสงสีเสียง"],
        },
        {
          type: "image",
          source: meetingRoomImg,
          title: "งานออกแบบและติดตั้งระบบถาวร (System Integration)",
          tags: [
            "ระบบอนาล็อก/ดิจิทัล",
            "เครือข่าย Dante AV",
            "การอบรมผู้ใช้งาน",
          ],
        },
      ],
    },
  };

  const current = content[lang];

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 border-t border-zinc-900/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
            {current.title}
          </h2>
          <p className="text-zinc-500 font-mono text-xs tracking-wider mt-2 uppercase">
            // {current.subtitle}
          </p>
          <div className="w-24 h-px bg-zinc-700 mx-auto mt-4" />
        </div>

        {/* ================= SUB-SECTION 1: WEB APPLICATIONS ================= */}
        <div className="mb-16">
          <div className="flex items-center space-x-2.5 mb-6 border-b border-zinc-800 pb-2">
            <Code size={18} className="text-zinc-400" />
            <h3 className="text-base font-mono font-bold text-zinc-300 tracking-wider uppercase">
              {current.softwareTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.softwareProjects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-linear-to-b from-zinc-900 to-neutral-950 border border-zinc-800 rounded-xl p-6 shadow-2xl transition-all duration-300 hover:border-zinc-600/50 flex flex-col justify-between group"
              >
                <div>
                  <h4 className="text-base font-bold text-zinc-200 tracking-wide mb-2 group-hover:text-white transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono tracking-wider font-semibold text-zinc-500 bg-neutral-950 border border-zinc-900 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 px-4 py-2 rounded-lg transition-all duration-200 active:scale-98 shadow-inner cursor-pointer"
                  >
                    <span>{current.btnLive}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SUB-SECTION 2: AUDIO-VISUAL ================= */}
        <div>
          <div className="flex items-center space-x-2.5 mb-6 border-b border-zinc-800 pb-2">
            <Video size={18} className="text-zinc-400" />
            <h3 className="text-base font-mono font-bold text-zinc-300 tracking-wider uppercase">
              {current.avTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.avProjects.map((card, idx) => (
              <div
                key={idx}
                className="bg-linear-to-b from-zinc-900 to-neutral-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-600/50 group"
              >
                <div className="relative aspect-video w-full bg-neutral-950 flex items-center justify-center overflow-hidden border-b border-zinc-900">
                  {card.type === "video" ? (
                    <video
                      src={card.source}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={card.source}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  )}
                </div>

                <div className="p-5">
                  <h4 className="text-sm font-bold text-zinc-200 tracking-wide mb-3">
                    {card.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono tracking-wider font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
