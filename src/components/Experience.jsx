import { Briefcase, GraduationCap, Award } from "lucide-react";

export const Experience = ({ lang }) => {
  const content = {
    EN: {
      title: "Experience & Education",
      subtitle: "Chronological History",
      sections: {
        experience: "Working Experience",
        education: "Educations",
        other: "Other Skills",
      },
      jobs: [
        {
          year: "2024 - Now",
          company: "Independent Practice",
          role: "Freelance Professional",
          details: [
            "Freelance DEV",
            "Freelance technician",
            "Audio-Visual System Engineer",
          ],
        },
        {
          year: "1992 - 2023",
          company: "Siam Music Yamaha Co., Ltd.",
          role: "Career Tenure Progression",
          details: [
            "2018 - 2023: After Sales & Services Manager",
            "2000 - 2017: Sales & Marketing Manager",
            "1995 - 2000: Sales Manager",
            "1992 - 1995: Sales Representative",
          ],
        },
      ],
      educationList: [
        {
          degree: "Bachelor Degree: Political Science",
          school: "Ramkhamhaeng University",
        },
        {
          degree: "Secondary School",
          school: "Yupparaj College, Chiangmai",
        },
      ],
      otherSkills: ["English Speak-Read-Write", "Driving Licence"],
    },
    TH: {
      title: "ประสบการณ์และการศึกษา",
      subtitle: "ประวัติการทำงานและคุณวุฒิ",
      sections: {
        experience: "ประสบการณ์การทำงาน",
        education: "ประวัติการศึกษา",
        other: "ทักษะอื่น ๆ",
      },
      jobs: [
        {
          year: "2024 - ปัจจุบัน",
          company: "งานอิสระ",
          role: "วิศวกรและนักพัฒนาอิสระ",
          details: [
            "นักพัฒนาซอฟต์แวร์อิสระ (Freelance DEV)",
            "ช่างเทคนิคอิสระ (Freelance technician)",
            "วิศวกรระบบภาพและเสียง (Audio-Visual)",
          ],
        },
        {
          year: "1992 - 2023",
          company: "บริษัท สยามดนตรียามาฮ่า จำกัด (Siam Music Yamaha)",
          role: "ความก้าวหน้าทางสายอาชีพ",
          details: [
            "2018 - 2023: ผู้จัดการฝ่ายบริการหลังการขาย (After Sales & Services Manager)",
            "2000 - 2017: ผู้จัดการฝ่ายขายและการตลาด (Sales & Marketing Manager)",
            "1995 - 2000: ผู้จัดการฝ่ายขาย (Sales Manager)",
            "1992 - 1995: ตัวแทนฝ่ายขาย (Sales Representative)",
          ],
        },
      ],
      educationList: [
        {
          degree: "ปริญญาตรี: รัฐศาสตรบัณฑิต",
          school: "มหาวิทยาลัยรามคำแหง",
        },
        {
          degree: "มัธยมศึกษา",
          school: "โรงเรียนยุพราชวิทยาลัย เชียงใหม่",
        },
      ],
      otherSkills: [
        "การสื่อสารภาษาอังกฤษ (พูด-อ่าน-เขียน)",
        "ใบอนุญาตขับขี่รถยนต์",
      ],
    },
  };

  const current = content[lang];

  return (
    <section
      id="skills" // Links smoothly to your Navbar "My Skills" link
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-zinc-100 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-widest bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent uppercase">
            {current.title}
          </h2>
          <p className="text-zinc-500 font-mono text-xs tracking-wider mt-2 uppercase">
            // {current.subtitle}
          </p>
          <div className="w-24 h-px bg-zinc-700 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT AREA: Work Experience Circuit Timeline (Spans 7 columns) */}
          <div className="lg:col-span-7 bg-neutral-900/30 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-8 border-b border-zinc-800 pb-3">
              <Briefcase size={20} className="text-zinc-400" />
              <h3 className="text-xl font-bold tracking-wide text-zinc-200">
                {current.sections.experience}
              </h3>
            </div>

            {/* Vertical Rail Layout */}
            <div className="relative border-l border-zinc-700 ml-3 md:ml-4 space-y-12">
              {current.jobs.map((job, idx) => (
                <div key={idx} className="relative pl-8 group">
                  {/* Glowing Node Stud on the rail */}
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:bg-zinc-100 transition-colors duration-300" />

                  {/* Job Header */}
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50 w-fit">
                      {job.year}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-300 mt-2 md:mt-0 tracking-wide">
                      {job.company}
                    </h4>
                  </div>

                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                    {job.role}
                  </p>

                  {/* Sub-roles & Duties Checklist */}
                  <ul className="space-y-2.5 text-sm text-zinc-400 bg-neutral-950/40 p-3 rounded-xl border border-zinc-800/80">
                    {job.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT AREA: Education & Secondary Capabilities (Spans 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Stack */}
            <div className="bg-neutral-900/30 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-6 border-b border-zinc-800 pb-3">
                <GraduationCap size={22} className="text-zinc-400" />
                <h3 className="text-lg font-bold tracking-wide text-zinc-200">
                  {current.sections.education}
                </h3>
              </div>

              <div className="space-y-4">
                {current.educationList.map((edu, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-zinc-700 pl-4 py-1"
                  >
                    <h4 className="text-sm font-bold text-zinc-300 tracking-wide">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium mt-1">
                      {edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Skills Stack */}
            <div className="bg-neutral-900/30 border border-zinc-800/60 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-6 border-b border-zinc-800 pb-3">
                <Award size={20} className="text-zinc-400" />
                <h3 className="text-lg font-bold tracking-wide text-zinc-200">
                  {current.sections.other}
                </h3>
              </div>

              <ul className="grid grid-cols-1 gap-3 text-sm text-zinc-400">
                {current.otherSkills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-3 bg-neutral-950/30 p-2.5 rounded-lg border border-zinc-800/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
